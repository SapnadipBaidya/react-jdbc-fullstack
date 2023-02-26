package com.sapnadip;


import java.sql.*;



public class ConnectionProviderClass {
	static Connection conn;//A Connection is a session between a Java application and a database. It helps to establish a connection with the database.
public static Connection createConnection() {
	try {
		//load the driver //forName() is used to register the driver class
			Class.forName("com.mysql.cj.jdbc.Driver");//1> register the driver class
			String user = "root";
			String password="1234";
			String url="jdbc:mysql://localhost:3306/grey_goose";
			conn=DriverManager.getConnection(url,user,password);//2> establish the connection with the given URL
//the get connection method of DriverManager Class is used to  establish connection with DataBase
	System.out.println("connection is up and running");
	}
    catch(Exception e) 
        {
    	System.out.println("connection could not be made sorry!!");
		//handle exception
		e.printStackTrace();
	}
	return conn;
}
}

/*Java Database Connectivity with 5 Steps
There are 5 steps to connect any java application with the database using JDBC. These steps are as follows:

1> Register the Driver class
2> Create connection
3>Create statement
4>Execute queries
5>Close connection

 */
