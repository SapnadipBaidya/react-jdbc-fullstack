package com.sapnadip;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.*;

public class UserDAO {

	public static boolean insertIntoDB(Model m) {
		boolean flag = false; // this basically will provide info that try block worked or not
		try {
			// The Connection interface is a factory of Statement, PreparedStatement
			Connection conn = ConnectionProviderClass.createConnection();
			String queryCheck = "select sl_no from winter_internship ORDER BY sl_NO DESC LIMIT 1";
			PreparedStatement pstmt1 = conn.prepareStatement(queryCheck);
			
			ResultSet set;
			set = pstmt1.executeQuery();//returns a result set
			set.next();
			int last_sl_no = set.getInt("sl_no");
			System.out.println("last_sl_no  = " + last_sl_no);
			int insertAt = last_sl_no+1;
			System.out.println("inser at= " + insertAt);
			String query = "insert into winter_internship(sl_no,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id)"
					+ " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			PreparedStatement pstmt = conn.prepareStatement(query);// 3>Create statement
			// pstmt=null;
//executeUpdate() -> executes the query. It is used for create, drop, insert, update, delete etc.
//setString-> sets the String value to the given parameter index.			
			pstmt.setInt(1, insertAt);
	     	pstmt.setString(2, m.getBusiness_code());// here getMethod is used since when we pass the instance
			pstmt.setString(3, m.getCust_number());// variables with data, those get stored in a object here we call
			pstmt.setString(4, m.getClear_date());// that object as m (in the argument so we need to call getters to get
												// those instanced
			pstmt.setString(5, m.getBuisness_year());// variable from the Model class for a particular object
			pstmt.setString(6, m.getDoc_id());
			pstmt.setString(7, m.getPosting_date());
			pstmt.setString(8, m.getDocument_create_date());
			pstmt.setString(9, m.getDue_in_date());
			pstmt.setString(10, m.getInvoice_currency());
			pstmt.setString(11, m.getDocument_type());
			pstmt.setString(12, m.getPosting_id());
			pstmt.setString(13, m.getTotal_open_amount());
			pstmt.setString(14, m.getBaseline_create_date());
			pstmt.setString(15, m.getCust_payment_terms());
			pstmt.setString(16, m.getInvoice_id());
			
			// The executeUpdate() method returns the number of rows affected by the SQL
			// statement
			int i = pstmt.executeUpdate();// 4> execute statements
			System.out.println(i + " records inserted");
			conn.close(); // 5> close conenction
			flag = true;// if try block worked then flag is true i.e. InsertIntoDB method returns true
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	public static boolean deleteUser(String sl_no_list) {
		boolean flag = false;
		try {
			System.out.println("inside user dao " + sl_no_list);
			Connection con = ConnectionProviderClass.createConnection();
			String query = "delete  from winter_internship where sl_no IN ( "+sl_no_list + " )";//sending an array of selected rows from from end
			PreparedStatement pstmt = con.prepareStatement(query);
			System.out.println("FLAG"); // pstmt=null;
//executeUpdate() -> executes the query. It is used for create, drop, insert, update, delete etc.
//setString-> sets the String value to the given parameter index.			
			//pstmt.setString(1, sl_no_list);
			
			// The executeUpdate() method returns the number of rows affected by the SQL
			// statement
			pstmt.executeUpdate();

			con.close();
			flag = true;// if try block worked then flag is true i.e. InsertIntoDB method returns true
		} catch (Exception e) {
			System.out.println("failed");
			e.printStackTrace();
		}
		return flag;
	}

}
