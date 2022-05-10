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
		} else if (user.getUserEmail() == null || user.getUserPW() == null) {
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
				session.setAttribute("userEmail", user.getUserEmail());
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("location.href='main.jsp';");
				script.println("</script>");	
			}
		}
		
	%>
</body>
</html>