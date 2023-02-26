package com.sapnadip;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 * Servlet implementation class PredictionUpdate
 */
@WebServlet("/PredictionUpdate")
public class PredictionUpdate extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PredictionUpdate() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//below code helps me to update the incoming age bucket json into DB
		Connection con = ConnectionProviderClass.createConnection();
		  StringBuffer jb = new StringBuffer();
		  String line = null;
		  try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null) {
		      jb.append(line);
		    }
		    String data=jb.toString();
		    JSONParser myParser=new JSONParser();
		    Object obj=myParser.parse(data);
		    JSONArray array=(JSONArray)obj;
		    for(int i=0;i<array.size();i++)
		    {
		    	JSONObject pre_update=(JSONObject)array.get(i);
		    	long doc_id=(Long)pre_update.get("doc_id");		   
		    	String Aging_bucket=(String)pre_update.get("aging_bucket");
		    	String query="update winter_internship set aging_bucket = ? where doc_id = ?";
				PreparedStatement pstm = con.prepareStatement(query);
				pstm.setString(1,Aging_bucket);
		    	pstm.setLong(2, doc_id);
		    	pstm.execute();
		    }
 
	} catch(Exception e) {
		e.printStackTrace();
	}

}
}