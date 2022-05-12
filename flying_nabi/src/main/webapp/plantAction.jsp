<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="writing.WritingDAO" %>
<%@ page import="user.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Arrays" %>
<% request.setCharacterEncoding("UTF-8"); %>
<jsp:useBean id="writing" class="writing.Writing" scope="page" />
<jsp:setProperty property="date" name="writing"/>
<jsp:setProperty property="emotionScore" name="writing"/>
<jsp:setProperty property="writing" name="writing"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>나는 나비</title>
</head>
<body>
	<%
		String userEmail = null;
		if(session.getAttribute("userEmail") != null) {
			userEmail = (String) session.getAttribute("userEmail");
		}
		if(userEmail == null) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('로그인이 필요합니다.');");
			script.println("location.href = './login.jsp';");
			script.println("</script>");
		} else {
			UserDAO userDAO = new UserDAO();
			int result1 = userDAO.addTree(userEmail);
			int result2 = userDAO.reducePoints(10, userEmail);
			if(result1 + result2 <= -1) {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('데이터베이스 오류입니다.');");
				script.println("history.back();");
				script.println("</script>");
			} else {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('나무 심었습니다! \\n 나의 포인트:" + userDAO.getPoints(userEmail) + "');");
				script.println("location.href='./main.jsp'");
				script.println("</script>");
				
			}
		}
		
	%>
</body>
</html>