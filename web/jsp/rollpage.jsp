<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="d-flex justify-content-between align-items-center flex-wrap">
    <div class="d-flex flex-wrap py-2 mr-3">
        <c:if test="${currentPageNo > 1}">
            <a href="javascript:;" onclick="page_nav(document.forms[0],1)"
               class="btn btn-icon btn-sm btn-hover-primary mr-2 my-1"><i class="ki ki-bold-double-arrow-back icon-xs"></i></a>
            <a href="javascript:;" onclick="page_nav(document.forms[0],${currentPageNo-1})"
               class="btn btn-icon btn-sm btn-hover-primary mr-2 my-1"><i class="ki ki-bold-arrow-back icon-xs"></i></a>
            <a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">...</a>
            <a href="javascript:;"
               onclick="page_nav(document.forms[0],${currentPageNo-1})" class="btn btn-icon btn-sm btn-hover-primary mr-2 my-1">${currentPageNo-1}</a>
        </c:if>
        <a class="btn btn-icon btn-sm btn-light mr-2 my-1 btn-hover-primary active">${currentPageNo }</a>
        <c:if test="${currentPageNo < totalPageCount }">
            <a href="javascript:;"
               onclick="page_nav(document.forms[0],${currentPageNo+1})" class="btn btn-icon btn-sm btn-hover-primary mr-2 my-1">${currentPageNo+1}</a>
            <a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">...</a>
            <a href="javascript:;"
               onclick="page_nav(document.forms[0],${currentPageNo+1})" class="btn btn-icon btn-sm btn-hover-primary mr-2 my-1"><i class="ki ki-bold-arrow-next icon-xs"></i></a>
            <a href="javascript:;"
               onclick="page_nav(document.forms[0],${totalPageCount})" class="btn btn-icon btn-sm btn-hover-primary mr-2 my-1"><i class="ki ki-bold-double-arrow-next icon-xs"></i></a>
        </c:if>
    </div>
    <div class="d-flex align-items-center py-3">
        <span >共${totalCount}条记录&nbsp;&nbsp; ${currentPageNo }/${totalPageCount }页</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="page-go-form" style="float:right;padding-right:25px;"><label>跳转至</label>
	        <input type="text" name="pageIndex" id="pageIndex" class="page-key" style="width: 40px"/>页
	        <button type="button" class="btn btn-icon btn-sm btn-light mr-2 my-1"
                    onClick='jump_to(document.forms[0],document.getElementById("pageIndex").value)'>GO</button>
		    </span>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath }/static/js/rollpage.js"></script>
