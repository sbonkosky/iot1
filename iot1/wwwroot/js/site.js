// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

$(function(){
    GET("https://localhost:5002")
    .done((data, textStatus, jqXHR) => {
        console.log(data);
    }).fail((jqXHR, textStatus, error) => {
        console.log(error);
    })
    .always(() => {
    });
});

function GET(url, data) {
    data = data || {};
    const request = {
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
    };
    console.log(JSON.stringify(request));
    const response = $.ajax(request);
    return response;
};