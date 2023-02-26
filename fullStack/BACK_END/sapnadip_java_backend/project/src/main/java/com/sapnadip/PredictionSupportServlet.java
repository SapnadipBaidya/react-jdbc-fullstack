package com.sapnadip;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
 * Servlet implementation class PredictionSupportServlet
 */
@WebServlet("/PredictionSupportServlet")
public class PredictionSupportServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PredictionSupportServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			//below codes help me to get details of the selected row numbers to front end so that i can send it to flask api
			Gson gson = new Gson();
			response.setContentType("text/html");
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
			String query = "select sl_no, business_code,invoice_currency, cust_number, clear_date, buisness_year,doc_id,posting_date,due_in_date,baseline_create_date,cust_payment_terms,total_open_amount from winter_internship where sl_no IN ( "+sl_no_list+")";
			PreparedStatement pstmt = con.prepareStatement(query);
			System.out.println("sl no list is "+sl_no_list);

			

			ResultSet set;

			set = pstmt.executeQuery();// returns a result set
			// ResultSet set = stmt.executeQuery(query);
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			ArrayList<Model> predDetails = new ArrayList<Model>();
			while (set.next()) {
                int sl_no = set.getInt("sl_no");
				String business_code = set.getString("business_code");
				String cust_number = set.getString("cust_number");
				String clear_date = set.getString("clear_date");
				String buisness_year = set.getString("buisness_year");
				String doc_id = set.getString("doc_id");
				String posting_date = set.getString("posting_date");
				String due_in_date = set.getString("due_in_date");
				String baseline_create_date = set.getString("baseline_create_date");
				String cust_payment_terms = set.getString("cust_payment_terms");
				String total_open_amount = set.getString("total_open_amount");
				Double total_open_amount_double = Double.parseDouble(total_open_amount);
				String invoice_currency=set.getString("invoice_currency");
				if(invoice_currency=="CAD") {
					total_open_amount_double=(double) (total_open_amount_double*0.75);
				}
				total_open_amount=total_open_amount_double.toString();
				Model business = new Model(sl_no,business_code, cust_number, clear_date, buisness_year, doc_id,
						posting_date, due_in_date, baseline_create_date, cust_payment_terms, total_open_amount);
				predDetails.add(business);

			}
			System.out.println("inside try block of showservlet");
			Response.put("predict_details", predDetails);

			// converting hashmap into json
			// response.getWriter().append("Served at: ").append(request.getContextPath());

			String JsonPostPredict = gson.toJson(Response);

			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(JsonPostPredict);
			out.flush();

			con.close();

		} catch (Exception e) {// Java's throwable class
			e.printStackTrace();// the line number and class name where the exception occurred.
			System.out.println("inside catch block of showservlet");
		}
	}

}
