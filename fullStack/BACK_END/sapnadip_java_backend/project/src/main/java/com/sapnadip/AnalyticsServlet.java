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
import java.util.Iterator;
import java.util.Map;
import java.time.LocalDate;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@WebServlet("/analytics")
public class AnalyticsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AnalyticsServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			LocalDate myObj = LocalDate.now(); // Create a date object
			String today = myObj.toString();
			Connection con = ConnectionProviderClass.createConnection();

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
//getting from front-end
			String baseline_create_date_start = myMap.get("baseline_create_date_start");
			String baseline_create_date_end = myMap.get("baseline_create_date_end");
			String clear_date_start = myMap.get("clear_date_start");
			String clear_date_end = myMap.get("clear_date_end");
			String due_in_date_start = myMap.get("due_in_date_start");
			String due_in_date_end = myMap.get("due_in_date_end");
			String invoice_currency = myMap.get("invoice_currency");
			
			if (invoice_currency == null) {
				invoice_currency = "";
			}
			// make it fully working even if no input is giving it will show all the
			// analysis for full DATABSE
			if (baseline_create_date_start == null) {
				baseline_create_date_start = "0000-00-00";
			}
			if (baseline_create_date_end == null) {
				baseline_create_date_end = today;
			}
			if (clear_date_start == null) {
				clear_date_start = "0000-00-00";
			}
			if (clear_date_end == null) {
				clear_date_end = today;
			}
			if (due_in_date_start == null) {
				due_in_date_start = "0000-00-00";
			}
			if (due_in_date_end == null) {
				due_in_date_end = today;
			}

			System.out.println(" baseline_create_date_start : " + baseline_create_date_start + "\n"
					+ "baseline_create_date_end : " + baseline_create_date_end);
			System.out.println(" clear_date_start : " + clear_date_start + "\n" + "clear_date_end : " + clear_date_end);
			System.out.println(
					" due_in_date_start : " + due_in_date_start + "\n" + "due_in_date_end : " + due_in_date_end);
			System.out.println(" invoice_currency : " + invoice_currency);

			System.out.println("inside try block of Analytics servlet");
			String queryForBusinessCode = "";
			if (invoice_currency != null) {
				invoice_currency = invoice_currency.toUpperCase();//giving null error if placed outside of this scope
				queryForBusinessCode = "select distinct business_code from winter_internship where clear_date between '"
						+ clear_date_start + " ' and ' " + clear_date_end + " ' AND due_in_date between ' "
						+ due_in_date_start + " ' and ' " + due_in_date_end + " ' AND baseline_create_date between ' "
						+ baseline_create_date_start + " ' and ' " + baseline_create_date_end
						+ " ' and invoice_currency = '" + invoice_currency + "'";
			}
			if (invoice_currency.length() == 0) {
				queryForBusinessCode = "select distinct business_code from winter_internship where clear_date between '"
						+ clear_date_start + " ' and ' " + clear_date_end + " ' AND due_in_date between ' "
						+ due_in_date_start + " ' and ' " + due_in_date_end + " ' AND baseline_create_date between ' "
						+ baseline_create_date_start + " ' and ' " + baseline_create_date_end + "'";
			}

			ArrayList<String> businessCodeArray = new ArrayList<String>();

			PreparedStatement pstmtBusinessCode = con.prepareStatement(queryForBusinessCode);
			ResultSet setBusinessCode;
			setBusinessCode = pstmtBusinessCode.executeQuery();// returns a result set
			while (setBusinessCode.next()) {
				String Bcode = setBusinessCode.getString(1);
				businessCodeArray.add(Bcode);
			}

			ArrayList<AnalyticsPojo> UserData = new ArrayList<AnalyticsPojo>();
			for (int i = 0; i < businessCodeArray.size(); i++) {
				System.out.println(businessCodeArray.get(i));
				String query = "";
				if (invoice_currency != null) {
					query = "select count(DISTINCT cust_number),sum(total_open_amount) from winter_internship where clear_date between ' "
							+ clear_date_start + " ' and ' " + clear_date_end + " ' AND due_in_date between ' "
							+ due_in_date_start + " ' and ' " + due_in_date_end
							+ " ' AND baseline_create_date between ' " + baseline_create_date_start + " ' and ' "
							+ baseline_create_date_end + " ' and invoice_currency = '" + invoice_currency
							+ "' AND business_code = '" + businessCodeArray.get(i) + "'";
				}
				if (invoice_currency.length() == 0) {
					query = "select count(DISTINCT cust_number),sum(total_open_amount) from winter_internship where clear_date between ' "
							+ clear_date_start + " ' and ' " + clear_date_end + " ' AND due_in_date between ' "
							+ due_in_date_start + " ' and ' " + due_in_date_end
							+ " ' AND baseline_create_date between ' " + baseline_create_date_start + " ' and ' "
							+ baseline_create_date_end + "' AND business_code = '" + businessCodeArray.get(i) + "'";
				}

				System.out.println("query " + query);
				PreparedStatement pstmt = con.prepareStatement(query);
				ResultSet set;

				set = pstmt.executeQuery();// returns a result set

				while (set.next()) {
					int cust_num_count = set.getInt(1);
					long total_open_amount_sum = set.getLong(2);
					System.out.println(cust_num_count + "\n" + total_open_amount_sum);
					AnalyticsPojo analyticContainer = new AnalyticsPojo(businessCodeArray.get(i), cust_num_count,
							total_open_amount_sum);
					UserData.add(analyticContainer);
				}
				System.out.println("----------------------------------------------------------");

			}
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			System.out.println("inside try block of showservlet");
			Response.put("bar_graph_details", UserData);// helps send response
			//making differnt queries for pie and bar
			String pieQueryUSD = "SELECT SUM(total_open_amount) FROM winter_internship WHERE clear_date BETWEEN '"
					+ clear_date_start + "' AND '" + clear_date_end + "' AND due_in_date BETWEEN '" + due_in_date_start
					+ "' AND '" + due_in_date_end + "' AND baseline_create_date BETWEEN '" + baseline_create_date_start
					+ "' AND '" + baseline_create_date_end + "' AND invoice_currency='USD'";
			String pieQueryCAD = "SELECT SUM(total_open_amount) FROM winter_internship WHERE clear_date BETWEEN '"
					+ clear_date_start + "' AND '" + clear_date_end + "' AND due_in_date BETWEEN '" + due_in_date_start
					+ "' AND '" + due_in_date_end + "' AND baseline_create_date BETWEEN '" + baseline_create_date_start
					+ "' AND '" + baseline_create_date_end + "' AND invoice_currency='CAD'";
			PreparedStatement pstmtUSD = con.prepareStatement(pieQueryUSD);
			ResultSet setUSD;
			setUSD = pstmtUSD.executeQuery();// returns a result set
			PreparedStatement pstmtCAD = con.prepareStatement(pieQueryCAD);
			ResultSet setCAD;
			setCAD = pstmtCAD.executeQuery();// returns a result set
			long total_open_amount_usd = 0;
			long total_open_amount_cad = 0;
			while (setUSD.next()) {
				total_open_amount_usd = setUSD.getLong(1);//since total open amount summed in very large

			}
			while (setCAD.next()) {
				total_open_amount_cad = setCAD.getLong(1);
			}
			AnalyticsPojo piepojo = new AnalyticsPojo(total_open_amount_usd, total_open_amount_cad);
			ArrayList<AnalyticsPojo> UserPieData = new ArrayList<AnalyticsPojo>();
			UserPieData.add(piepojo);
			// String JsonBusinessData = gson.toJson(Response);
			Response.put("pie_chart_details", UserPieData);
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			String JsonBusinessData = gson.toJson(Response);
			out.print(JsonBusinessData);
			out.flush();

			con.close();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
