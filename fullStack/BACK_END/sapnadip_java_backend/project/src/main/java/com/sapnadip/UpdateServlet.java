package com.sapnadip;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.reflect.TypeToken;
import com.google.gson.Gson;

/**
 * Servlet implementation class UpdateServlet
 */
@WebServlet("/CommitEdit")
public class UpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UpdateServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			System.out.println(" updating ...");
			Connection con = ConnectionProviderClass.createConnection();
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));

			String json = "";
			if (br != null) {
				json = br.readLine();

			}
			// System.out.println(json); this prints a "{jsonObject}"
			Gson gson = new Gson();
			Type type = new TypeToken<Map<String, String>>() {
			}.getType();
			Map<String, String> myMap = gson.fromJson(json, type);

			// System.out.println(myMap.get("invoice_currency").getClass().getSimpleName());
			// checking the type of variable
			boolean status = false;
			int sl_no = Integer.parseInt(myMap.get("sl_no"));
			String invoice_currency = myMap.get("invoice_currency");
			String cust_payment_terms = myMap.get("cust_payment_terms");
			invoice_currency=invoice_currency.toUpperCase();
			cust_payment_terms=cust_payment_terms.toUpperCase();
			System.out.println("sl_no : " + sl_no + "\n invoice_currency inside updateservlet : " + invoice_currency
					+ "\n" + "cust_payment_terms inside updateservlet : " + cust_payment_terms);

			if (cust_payment_terms != null && invoice_currency != null) {
				String query = "update winter_internship set invoice_currency = ? ,cust_payment_terms = ? where sl_no = ?";
				PreparedStatement pstm = con.prepareStatement(query);
				pstm.setString(1, invoice_currency);
				pstm.setString(2, cust_payment_terms);
				pstm.setInt(3, sl_no);
				pstm.execute();
				status = true;
				System.out.println("inside 3st if");
			}

			if (status == true) {
				Response.put("status", true);
			} else {
				Response.put("status", false);
			}

		} catch (Exception e) {
			// TODO: handle exception
		}

	}

}
