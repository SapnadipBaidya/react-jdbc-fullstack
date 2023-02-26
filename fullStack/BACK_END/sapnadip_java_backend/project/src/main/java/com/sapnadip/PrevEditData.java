package com.sapnadip;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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


@WebServlet("/PrevEditData")
public class PrevEditData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
  
    public PrevEditData() {
        super();
        // TODO Auto-generated constructor stub
    }

	
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		try {
			//below codes help me to get the current value of invoice_currency,cust_payment_terms in DB
			Connection con = ConnectionProviderClass.createConnection();
			String query = "select sl_no,invoice_currency,cust_payment_terms from winter_internship where sl_no = ?";
			PreparedStatement pstmt = con.prepareStatement(query);
			Gson gson = new Gson();
			response.setContentType("text/html");
			
			Type type = new TypeToken<Map<String, String>>() {
			}.getType();

			BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));

			String json = "";
			if (br != null) {
				json = br.readLine();

			}  
			Map<String, String> myMap = gson.fromJson(json, type);
			String prev_sl_no = myMap.get("sl_no");
			
               
			System.out.println("prev_sl_no " + prev_sl_no);
			
			pstmt.setString(1, prev_sl_no);
			ResultSet set;

			set = pstmt.executeQuery();// returns a result set
			// ResultSet set = stmt.executeQuery(query);
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			ArrayList<Model> prevEdit = new ArrayList<Model>();
			while (set.next()) {

				int sl_no=Integer.parseInt(set.getString("sl_no"));
				String invoice_currency = set.getString("invoice_currency");
				
				String cust_payment_terms = set.getString("cust_payment_terms");
				
				Model business = new Model(sl_no,invoice_currency,cust_payment_terms);
				prevEdit.add(business);

			}
			System.out.println("inside try block of showservlet");
			Response.put("prev_edit_detail", prevEdit);

			// converting hashmap into json
			// response.getWriter().append("Served at: ").append(request.getContextPath());

			String JsonBusinessData = gson.toJson(Response);

			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(JsonBusinessData);
			out.flush();

			con.close();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
