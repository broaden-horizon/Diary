<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sunflower:wght@500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style_login.css">
<title>나는 나비</title>
</head>
<div class='back'><a href="./index.jsp">뒤로가기</a></div>
<%
		String userEmail = null;
		if(session.getAttribute("userEmail") != null) {
			userEmail = (String) session.getAttribute("userEmail");
		}
		if(userEmail != null) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('이미 로그인 되어 있습니다.');");
			script.println("location.href = './main.jsp'");
			script.println("</script>");
		}
		
%>
<body class="body">
<div class='cover' style = 'background-color: black; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index:3000; margin: 0; transition: opacity 2s;' ></div>
<!-- 로그인 화면 -->
<div class="loginbox position-absolute top-50 start-50 translate-middle shadow p-3 mb-5 bg-body rounded">
	<div class="login">
		<div class='loginTitle'><h2>로그인</h2></div>
		<form method="post" action="loginAction.jsp">
			<div class="form-floating mb-3">
			  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="userEmail">
			  <label for="floatingInput">이메일</label>
			</div>
			<div class="form-floating">
			  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="userPW">
			  <label for="floatingPassword">패스워드</label>
			</div>
			<input class="loginBtn submit btn btn-outline-secondary" type="submit" value="로그인">
		</form>
	</div>
	<button class="joinPageBtn btn btn-light"><i class="arrow bi bi-chevron-bar-left gray"></i></button>
</div>

<!-- 회원가입 화면 -->

<div class="joinbox d-none position-absolute top-50 start-50 translate-middle">
	<button class='backBtn'></button>
	<div class="join">
		<div class='joinTitle'><h2>회원가입</h2></div>
		<form method="post" action="joinAction.jsp">
			<div class="form-floating mb-3">
			  <input type="email" class="form-control email" placeholder="name@example.com" name="userEmail">
			  <label for="floatingInput">아이디</label>
			</div>
			<div class="form-floating mb-3">
			  <input type="password" class="pw form-control" placeholder="Password" name="userPW">
			  <label for="floatingPassword">비밀번호</label>
			</div>
			<div class="form-floating">
			  <input type="password" class="pw_ch form-control" placeholder="Password">
			  <label for="floatingPassword_ch">비밀번호 확인</label>
			</div>
			<input class="joinBtn submit btn btn-outline-secondary" type="submit" value="회원가입">
		</form>
	</div>
</div>

<script type="module" src="/script/script_login.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>