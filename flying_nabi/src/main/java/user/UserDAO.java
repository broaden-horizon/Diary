package user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;

	public UserDAO() {
		try {
			String dbURL = "jdbc:mysql://localhost:3306/FLYING";
			String dbID = "root";
			String dbPW = "12345678";
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPW);
			
		} catch (Exception e) {
			e.printStackTrace();// TODO: handle exceptio
		}
	}
	
	public int login(String userEmail, String userPW) {
		String SQL = "SELECT userPW FROM USER WHERE userEmail = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			rs = pstmt.executeQuery();
			
			if (rs.next()) {
				if(rs.getString(1).equals(userPW)) {
					return 1;//log success
				}
				return 0; //pw unmatch
			}
			return -1; //일치하는 아이디가 없음 
		} catch (Exception e) {
			e.printStackTrace();// TODO: handle exception
		}
		return -2; //데이터 베이스 오류
	}




}

