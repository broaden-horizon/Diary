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
<title>로그인</title>
</head>
<body>
	<%
		String userEmail = null;
		if(session.getAttribute("userEmail") != null) {
			userEmail = (String) session.getAttribute("userEmail");
		}
		if(userEmail != null) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('이미 로그인 되어 있습니다.');");
			script.println("history.back();");
			script.println("</script>");
		}
		
		UserDAO userDAO = new UserDAO();
		int result = userDAO.login(user.getUserEmail(), user.getUserPW());
		if (result == 1) {
			session.setAttribute("userEmail", user.getUserEmail());
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("location.href = 'main.jsp';");
			script.println("</script>");
		} else if (result == 0) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('비밀번호가 일치하지 않습니다.');");
			script.println("history.back();");
			script.println("</script>");	
		} else if (result == -1) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('일치하는 아이디가 없습니다.');");
			script.println("history.back();");
			script.println("</script>");	
		} else {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('datebase 오류 입니다.');");
			script.println("history.back();");
			script.println("</script>");	
		}
		
	%>
</body>
</html>