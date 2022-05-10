<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="writing.Writing" %>
<%@ page import="writing.WritingDAO" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.io.PrintWriter" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" integrity="sha512-aOG0c6nPNzGk+5zjwyJaoRUgCdOrfSDhmMID2u4+OIslr0GjpLKo7Xm0Ao3xmpM4T8AmIouRkqwj1nrdVsLKEQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="/css/style_main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sunflower:wght@500&display=swap" rel="stylesheet">
<title>나는 나비</title>
</head>
<body>
<%
    String userEmail = null; // 로그인이 된 사람들은 로그인정보를 담을 수 있도록한다
    if (session.getAttribute("userEmail") != null)
    {
        userEmail = (String)session.getAttribute("userEmail");
    } else {
    	PrintWriter script = response.getWriter();
		script.println("<script>");
		script.println("alert('로그인이 필요합니다.');");
		script.println("href='login.jsp';");
		script.println("</script>");
    }
    
    
    WritingDAO writingDAO = new WritingDAO();
%>
<div class="treeBox position-absolute bottom-0 start-50 translate-middle-x"></div>
<div class='logout'><a href="./logoutAction.jsp">로그아웃</a></div>

<div class='greeting'>
	환영합니다! 무엇을 하시겠어요?
</div>


<div class='buttonBox position-absolute top-50 start-50 translate-middle'>
	<button type="button" class="btn btn-outline-success btn-record">기록하기</button>
	<button type="button" class="btn btn-outline-success btn-search">돌아보기</button>
</div>

<div class='record_box shadow mb-5 bg-body rounded position-absolute top-100 start-50 translate-middle d-none'>
	<form method="post" action="./recordAction.jsp" class='h-100'>
		
		<div class="container h-100">
			<div class="row">
				<div class='col-12 mb-1'>
					<span>날짜 선택</span>
				</div>
			</div>
			<div class="row">
				<div class='col gx-3 gy-0'>
					<div class="dateBox input-group mb-3 w-75">
						<span class="input-group-text border-dark"><i class="bi bi-calendar-event"></i></span>
						<input class="form-control datepicker border-dark" placeholder="날짜를 선택해주세요" name="date">
					</div>
				</div>
			</div>
			<div class="row">
				<div class='col-12'>
					<label for="emotionScore" class="form-label">감정 점수</label>
					<span class="emotionScore">(1점)</span>
				</div>
			</div>
			<div class="row gx-0 gy-0 mb-3">
				<div class="col-2"><img class='emotion' src="./img/sad.png"></div>
				<div class="col-8"><input type="range" class="emotionRange form-range" min="0" max="2" step="1" id="emotionScore" name='emotionScore'></div>
				<div class="col-2"><img class='emotion' src="./img/happy.png"></div>
			</div>
			<div class="row">
				<div class='col-12'>
					<span>기록</span>
				</div>
			</div>
			<div class="row writingBox vh-20 mb-3">
				<div class='col-12 mh-100'>
					<textarea name="writing"class="form-control border border-dark h-100" aria-label="With textarea"></textarea>
				</div>
			</div>
			<div class="row">
				<div class='col-6'>
					<button type='button' onclick='funtion(){}' class="back btn btn-outline-dark float-left">뒤로가기</button>
				</div>
				<div class='col-6 submitBox'>
					<input class="recordSubmit btn btn-outline-dark float-right" type="submit" value="저장">
				</div>
			</div>  
		</div>
	</form>
</div>

<!-- year selection part -->
<div class='search_box year shadow mb-5 bg-body rounded position-absolute top-100 start-50 translate-middle d-none'>		
	<div class="container h-100">
		<div class='row'>
		<%
			ArrayList<String> listYear = writingDAO.getDate(userEmail, "year", "");
			for(int i = 0; i < listYear.size(); i++) {
				if(i != 0 && i % 4 == 0) {
					%>
						</div>
						<div class='row'>
					<%
				}
				%>
					<div class='col-3'><button type="button" class="btn btn-outline-dark border-radius-lg" onclick="yearClick(<%=i%>, 'year')">year<br /><h5><%=listYear.get(i)%></h5></button></div>
				<%
			}
		%>
		</div>
		<button type='button' class="yearBackBtn backToYear btn btn-outline-dark float-left">뒤로가기</button>
	</div>
</div>
<!-- month selection part -->
<%
ArrayList<String> listMonth = null;
for(int i = 0; i < listYear.size(); i++) {
%>
<div class='search_box month-<%=i%> shadow mb-5 bg-body rounded position-absolute top-100 start-50 translate-middle d-none'>		
	<div class="container h-100">
		<div class='row'>
		<%
			listMonth = writingDAO.getDate(userEmail, "month", listYear.get(i));
			for(int j = 0; j < listMonth.size(); j++) {
				if(j != 0 && j % 4 == 0) {
					%>
						</div>
						<div class='row'>
					<%
				}
				%>
					<div class='col-3'><a href="writing.jsp?year=<%=listYear.get(i)%>&month=<%=listMonth.get(j)%>"><button type="button" class="btn btn-outline-dark border-radius-lg">month<br /><h5><%=listMonth.get(j)%></h5></button></a></div>
				<%
			}
		%>
		</div>
		<button type='button' onclick="yearClick(<%=i%>, 'month')" class="backToYear btn btn-outline-dark float-left">뒤로가기</button>  
	</div>
</div>
<%
}
%>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script type="module" src="/script/script_main.js"></script>
<script type="module" src="./script/app.js" ></script>
<script>
	const yearBox = document.querySelector(".year");
	function yearClick(index, ym) {
		//dom 객체 생성
		const monthBox = document.querySelector(".month-"+index);
		let popUp = null;
		let popDown = null;
		
		if(ym==="year") {
			popUp = monthBox;
			popDown = yearBox;
		} else {
			popUp = yearBox;
			popDown = monthBox;
		}
		popDown.classList.toggle("top-50");
		popDown.classList.toggle("top-100");
		popDown.style.opacity = 0;
		setTimeout(() => {
			popDown.classList.toggle("d-none");	
		}, 500);
		
		popUp.classList.toggle("d-none");
		setTimeout(() => {
			popUp.classList.toggle("top-50");
			popUp.classList.toggle("top-100");
			popUp.style.opacity = 1;	
		}, 500);
	}
</script>

</body>	
</html>
