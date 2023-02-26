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
 * Servlet implementation class SearchServlet
 */
@WebServlet("/AdvancedSearchServlet")
public class AdvancedSearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AdvancedSearchServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			Gson gson = new Gson();
			response.setContentType("text/html");
			Connection con = ConnectionProviderClass.createConnection();

			String document_id = request.getParameter("doc_id");
			String invoiceId = request.getParameter("invoice_id");
			String buisnessYear = request.getParameter("buisness_year");
			String customer_number = request.getParameter("cust_number");

			System.out.println(document_id + " " + invoiceId + " " + buisnessYear + " " + customer_number);

			String query = "select sl_no, business_code, cust_number, clear_date, buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id from winter_internship where doc_id = "
					+ document_id + " and invoice_id = " + invoiceId + " and buisness_year = " + buisnessYear
					+ " and cust_number = " + customer_number;
			PreparedStatement pstmt = con.prepareStatement(query);
			ResultSet set;

			set = pstmt.executeQuery();// returns a result set
			System.out.println(set);
			// ResultSet set = stmt.executeQuery(query);
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			ArrayList<Model> searchResultAdv = new ArrayList<Model>();
			while (set.next()) {

				int sl_no = set.getInt(1);
				String business_code = set.getString(2);
				String cust_number = set.getString(3);
				String clear_date = set.getString(4);
				String buisness_year = set.getString(5);
				String doc_id = set.getString(6);
				String posting_date = set.getString(7);
				String document_create_date = set.getString(8);
				String due_in_date = set.getString(9);
				String invoice_currency = set.getString(10);
				String document_type = set.getString(11);
				String posting_id = set.getString(12);
				String total_open_amount = set.getString(13);
				String baseline_create_date = set.getString(14);
				String cust_payment_terms = set.getString(15);
				String invoice_id = set.getString(16);
				Model business = new Model(sl_no, business_code, cust_number, clear_date, buisness_year, doc_id,
						posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id,
						total_open_amount, baseline_create_date, cust_payment_terms, invoice_id);
				searchResultAdv.add(business);

			}
			System.out.println("inside try block of servlet");
			Response.put("advanced_search_result", searchResultAdv);

			// converting hashmap into json
			// response.getWriter().append("Served at: ").append(request.getContextPath());

			String JsonBusinessData = gson.toJson(Response);

			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(JsonBusinessData);
			out.flush();

			con.close();

		} catch (Exception e) {// Java's throwable class
			e.printStackTrace();// the line number and class name where the exception occurred.
			System.out.println("inside catch block of search servlet");
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

}
