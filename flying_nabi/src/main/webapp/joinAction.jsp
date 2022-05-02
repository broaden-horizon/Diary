<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="user.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>
<% request.setCharacterEncoding("UTF-8"); %>
<jsp:useBean id="user" class="user.User" scope="page"></jsp:useBean>
<jsp:setProperty property="userEmail" name="user"/>
<jsp:setProperty property="userPW" name="user"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
</head>
<body>
	<%
 		System.out.println(user.getUserEmail() + user.getUserPW());
		if(user.getUserEmail() == null || user.getUserPW() == null) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('모든 항목에 입력해주세요.');");
			script.println("history.back();");
			script.println("</script>");	
		} else {
			UserDAO userDAO = new UserDAO();
			int result = userDAO.join(user);
			if (result == -2) {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('이미 존재하는 아이디입니다.');");
				script.println("history.back();");
				script.println("</script>");	
			} else {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("location.href='main.jsp';");
				script.println("</script>");	
			}
		}
		
	%>
</body>
</html>