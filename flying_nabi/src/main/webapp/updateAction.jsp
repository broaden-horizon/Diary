<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="writing.WritingDAO" %>
<%@ page import="user.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>
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
		} else if (writing.getDate() == null || writing.getWriting() == null) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('모든 칸을 채워주세요.');");
			script.println("history.back();");
			script.println("</script>");
		} else {
			WritingDAO writingDAO = new WritingDAO();
			int resultDelet = writingDAO.delete(userEmail, writing.getDate());
			int result = writingDAO.write(userEmail, writing.getDate(), writing.getEmotionScore(), writing.getWriting());
			if (result + resultDelet <= -1) {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('데이터베이스 오류입니다.');");
				script.println("history.back();");
				script.println("</script>");
			} else { 
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("location.href='writing.jsp?year=" + writing.getDate().substring(0,4) + "&month=" + writing.getDate().substring(5, 7) + "'");
				script.println("</script>");
			}
			
		}
		
	%>
</body>
</html>