# Blog Backend API

## Overview
This is a simple api for creating a user and blogs

## Prerequisites
Make sure you have Node.Js and Npm Installed on your pc

## installation
> download the zip file & extract the zip

>npm install

 OR

 > yarn install

 This will install all the dependencies

 ## Configuration

> BaseURl: http://localhost:3000/api

 # Endpoints
 ## User Endpoint
 > {BaseUrl}/user -> this gets all the registered users

 * Method: GET
#
 > {BaseUrl}/user/signup -> this creates a new user
 * Method: POST
  ### required signup fields
 > * name : string
 
 > * email : string
 
 > * password : string
#
 > {BaseUrl}/user/login -> this finds and verifies if a user exist
 * Method: POST
  ### required login fields
 > * email : string
 
 > * password : string
 ## Blog Endpoint
 > {BaseUrl}/blog/ -> this finds all created blogs

 * Method: GET
#
 > {BaseUrl}/blog/:id -> this finds a single blog by it's id
 * Method: GET
 * params: id

#
 > {BaseUrl}/blog/user/:id -> this a user and all it's blogs
 * Method: GET
 * params: id

#
 > {BaseUrl}/blog/add -> this creates a new blog
 * Method: POST
  ### required creating blog fields
 > * title : string
 
 > * description : string
 
 > * image : string

 > * userId: user's Id
#
 > {BaseUrl}/blog/updateBlog/:id -> this updates a blog
 * Method: PUT
 * params: id
  ### required updating blog fields
 > * title : string
 
 > * description : string
#
 > {BaseUrl}/blog/:id -> this deletes a blog
 * Method: DELETE
 * params: id


 ### Environment Variables

* MONGODB_URI="databaseUrl"

Replace **databaseUrl** with your own database url

## Starting The Project
Once you've configured your environment variables, you can start your project:

> npm start

the server should now be running at *http://localhost:3000*