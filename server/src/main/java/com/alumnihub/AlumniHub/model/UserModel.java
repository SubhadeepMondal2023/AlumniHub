package com.alumnihub.AlumniHub.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class UserModel {

    @Id
    private ObjectId id;
    private String name;
    private int year=-1;
    public ObjectId getId() {
        return id;
    }
    public void setId(ObjectId id) {
        this.id=id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name=name;
    }
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year=year;
    }   
        
}
