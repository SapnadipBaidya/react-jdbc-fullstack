package com.sapnadip;

public class AnalyticsPojo {

	public String getBcode() {
		return Bcode;
	}

	public void setBcode(String bcode) {
		Bcode = bcode;
	}

	public int getCust_num_count() {
		return cust_num_count;
	}

	public void setCust_num_count(int cust_num_count) {
		this.cust_num_count = cust_num_count;
	}

	public long getTotal_open_amount_sum() {
		return total_open_amount_sum;
	}

	public void setTotal_open_amount_sum(long total_open_amount_sum) {
		this.total_open_amount_sum = total_open_amount_sum;
	}

	public AnalyticsPojo(String bcode, int cust_num_count, long total_open_amount_sum) {
		super();
		Bcode = bcode;
		this.cust_num_count = cust_num_count;
		this.total_open_amount_sum = total_open_amount_sum;
	}

	protected String Bcode;
	protected int cust_num_count;
	protected long total_open_amount_sum;
	protected long total_open_amount_usd;
	protected long total_open_amount_cad;

	public AnalyticsPojo(long total_open_amount_usd, long total_open_amount_cad) {
		super();
		this.total_open_amount_usd = total_open_amount_usd;
		this.total_open_amount_cad = total_open_amount_cad;
	}

}
