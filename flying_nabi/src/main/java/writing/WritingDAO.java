package writing;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class WritingDAO {
	
	public String getDate() {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Connection conn = null;
		String dbURL = "jdbc:mysql://localhost:3306/FLYING";
		String dbID = "root";
		String dbPW = "12345678";
		String SQL = "SELECT NOW()";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPW);
			pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				return rs.getString(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return ""; //database error
	}
	
	public int getNext() {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Connection conn = null;
		String dbURL = "jdbc:mysql://localhost:3306/FLYING";
		String dbID = "root";
		String dbPW = "12345678";
		String SQL = "SELECT writingID FROM WRITING ORDER BY writingID DESC";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPW);
			pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				return rs.getInt(1) + 1;
			}
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return -1; //database error
	}
	
	public int write(String userEmail, String date, String emotionScore, String writing) {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Connection conn = null;
		String dbURL = "jdbc:mysql://localhost:3306/FLYING";
		String dbID = "root";
		String dbPW = "12345678";
		String SQL = "INSERT INTO WRITING VALUES (?, ?, ?, ?, ?, ?)";
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPW);
			pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, getNext());
			pstmt.setString(2, userEmail);
			pstmt.setString(3, getDate());
			pstmt.setString(4, date);
			pstmt.setInt(5, Integer.parseInt(emotionScore));
			pstmt.setString(6,  writing);
			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return -1; //database error
	}
	
	public ArrayList<String> getDate(String userEmail, String date, String filter) {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Connection conn = null;
		String dbURL = "jdbc:mysql://localhost:3306/FLYING";
		String dbID = "root";
		String dbPW = "12345678";
		String SQL = null;
		if (date.equals("year")) {
			SQL = "SELECT YEAR(date) FROM ( SELECT * FROM WRITING WHERE userEmail = ? ORDER BY date limit 30) as ordered GROUP BY YEAR(date)";
		} else if(date.equals("month")) {
			SQL = "SELECT MONTH(date) FROM ( SELECT * FROM WRITING WHERE userEmail = ? AND YEAR(date) = ? ORDER BY date limit 12) as ordered GROUP BY MONTH(date)";
		} else if(date.equals("day")) {
			SQL = "SELECT DAY(date) FROM ( SELECT * FROM WRITING WHERE userEmail = ? AND MONTH(date) = ? ORDER BY date limit 32) as ordered GROUP BY DAY(date)";
		} else {
			System.out.println("getDate 함수의 인자를 잘못입력했습니다.");
			return null;
		}
		
		ArrayList<String> list = new ArrayList<String>();
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPW);
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			if(!date.equals("year") ) {
				pstmt.setString(2, filter);
			}
			rs = pstmt.executeQuery();
			while(rs.next()) {
				list.add(rs.getString(1));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return list; //database error
		
		
	}
	public ArrayList<Writing> getWriting(String userEmail, String year, String month) {
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		Connection conn = null;
		String dbURL = "jdbc:mysql://localhost:3306/FLYING";
		String dbID = "root";
		String dbPW = "12345678";
		String SQL = "SELECT * FROM WRITING WHERE userEmail = ? AND YEAR(date) = ? AND MONTH(date) = ? ORDER BY date";
		ArrayList<Writing> list = new ArrayList<Writing>();
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPW);
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userEmail);
			pstmt.setString(2, year);
			pstmt.setString(3, month);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				Writing writing = new Writing();
				writing.setDate(rs.getString(4));
				writing.setEmotionScore(rs.getString(5));
				writing.setWriting(rs.getString(6));
				writing.setIsAvailable(rs.getInt(7));
				list.add(writing);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if(pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if(conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return list;
	}
}
