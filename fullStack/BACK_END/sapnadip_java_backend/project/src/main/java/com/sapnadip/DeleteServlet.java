package com.sapnadip;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
/**
 * Servlet implementation class DeleteServlet
 */
@WebServlet("/delete")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	
		Gson gson = new Gson();
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		pw.print("inside DELETE sevlet");
		Connection con = ConnectionProviderClass.createConnection();
		
		BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
		String json = "";
		if (br != null) {
			
			json = br.readLine();
			
			}
		
		System.out.println(json);
		Type type = new TypeToken<Map<String, String>>() {}.getType();
		Map<String, String> myOwnMap = gson.fromJson(json, type);
		String sl_no_list = myOwnMap.get("totalSelectedRows");
		
		
		System.out.println("sl no list is "+sl_no_list);
		boolean flagD = UserDAO.deleteUser(sl_no_list);
		if (flagD) {
			System.out.println("Success in data deleting in db");
		} else {
			System.out.println("something went wrong in deleting data in delete servlet try again");
		}
	}

}
