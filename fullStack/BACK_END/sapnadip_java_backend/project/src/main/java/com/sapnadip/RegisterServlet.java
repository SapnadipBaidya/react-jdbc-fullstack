package com.sapnadip;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.sql.Connection;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * Servlet implementation class RegisterServlet
 */
@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegisterServlet() {
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
		pw.print("inside ADD/Register sevlet");
		Connection con = ConnectionProviderClass.createConnection();//creates connection
		
		BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));//reading request body
		String json = "";
		if (br != null) {
			
			json = br.readLine();
			
			}
		
		System.out.println(json);
		Type type = new TypeToken<Map<String, String>>() {}.getType();
		Map<String, String> myOwnMap = gson.fromJson(json, type);//converting from json to a java object,here map
		String business_code = myOwnMap.get("business_code");
		String cust_number = myOwnMap.get("cust_number");
		String clear_date = myOwnMap.get("clear_date");
		String buisness_year =myOwnMap.get("buisness_year");
		String doc_id = myOwnMap.get("doc_id");
		String posting_date =myOwnMap.get("posting_date");
		String document_create_date = myOwnMap.get("document_create_date");
		String due_in_date = myOwnMap.get("due_in_date");
		String invoice_currency = myOwnMap.get("invoice_currency");
		String document_type = myOwnMap.get("document_type");
		String posting_id = myOwnMap.get("posting_id");
		String total_open_amount = myOwnMap.get("total_open_amount");
		String baseline_create_date = myOwnMap.get("baseline_create_date");
		String cust_payment_terms = myOwnMap.get("cust_payment_terms");
		String invoice_id = myOwnMap.get("invoice_id");
		
		System.out.println("business_code " +business_code +"\n" +"cust_number "+cust_number +"\n" +"clear_date "+ clear_date +"\n"+"buisness_year "+ buisness_year +"\n" +"doc_id "+doc_id+"\n"+"posting_date " +posting_date+"\n"+"document_create_date " +document_create_date+"\n" +"due_in_date "+due_in_date+"\n" +"invoice_currency "+invoice_currency+"\n" +"document_type "+document_type+"\n"+"posting_id " +posting_id+"\n" +"total_open_amount "+total_open_amount+"\n" +"baseline_create_date "+baseline_create_date+"\n"+"cust_payment_terms " +cust_payment_terms+"\n" +"invoice_id "+invoice_id);
		
		Model mobj = new Model(business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id);
		boolean answer = UserDAO.insertIntoDB(mobj);//sending the object into userDAO 
		if (answer) {
			System.out.println("Success in data adding in db");
		} else {
			System.out.println("something went wrong try again");
		}
	}

}
