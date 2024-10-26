package com.alumnihub.AlumniHub.repository;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.alumnihub.AlumniHub.model.UserModel;

public interface UserRepository extends MongoRepository<UserModel,ObjectId> {

}
