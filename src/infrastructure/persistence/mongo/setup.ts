import { MongoGetAllCoursesQueryHandler, MongoGetAllStudentsQueryHandler } from './query/mongo-queryhandlers';
import { UserMongoRepository } from './repository/user-mongo.repository';
import { StudentMongoRepository } from './repository/student-mongo.repository';
import { InvitationMongoRepository } from './repository/invitation-mongo.repository';
import { CourseMongoRepository } from './repository/course-mongo.repository';
import { IdMongoGenerator } from './id-generator-mongo.provider';

import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongoUnitOfWork } from './unit-of-work/mongo-unit-of-work';

let client;
let db;

const queryHandlers = [
  MongoGetAllStudentsQueryHandler,
  MongoGetAllCoursesQueryHandler,
];
const repositories = [
  {
    name: 'UserRepository',
    ctor: UserMongoRepository,
  },
  {
    name: 'StudentRepository',
    ctor: StudentMongoRepository,
  },
  {
    name: 'InvitationRepository',
    ctor: InvitationMongoRepository,
  },
  {
    name: 'CourseRepository',
    ctor: CourseMongoRepository,
  },

];
const IdGenerator = {
  provide: 'IdGenerator',
  useClass: IdMongoGenerator,
};

const loadClient = async (configService: ConfigService) => {
  if (!client) {
    client = await MongoClient.connect(
      configService.get('MONGO_CONNECTION_URL'),
      { useUnifiedTopology: true },
    );
  }
  return client;
};
const loadDb = async (configService: ConfigService) => {
  if (!db) {
    if(!client){
      await loadClient(configService)
    }
    db = client.db(configService.get('MONGO_DB'));
  }
  return db;
};
const createRepositoryProviders = (...repos) => {
  return repos.map(repo => {
    return {
      provide: repo.name,
      useFactory: async (configService: ConfigService) => await new repo.ctor(
        await loadDb(configService)
      ),
      inject: [ConfigService],
    };
  });
};

const createQueryProviders = (...queries) => {
  return queries.map(query => {
    return {
      provide: query,
      useFactory: async (configService: ConfigService) => await new query(await loadDb(configService)),
      inject: [ConfigService],
    };
  });
};
const createUnitOfWork = () => {
  return {
    provide: 'UnitOfWork',
    useFactory: async (configService) => await new MongoUnitOfWork(await loadClient(configService)),
    inject: [ConfigService],
  };
};
export const Repositories = createRepositoryProviders(...repositories);
export const QueryHandlers = createQueryProviders(...queryHandlers);
export const OtherProviders = [IdGenerator, createUnitOfWork()];

