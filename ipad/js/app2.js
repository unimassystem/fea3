angular.module('todo', ['ionic'])
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})

.controller('TodoCtrl', function($scope, $http, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  // A utility function for creating a new project
  // with the given projectTitle
  // var createProject = function(projectTitle) {
  //   var newProject = Projects.newProject(projectTitle);
  //   $scope.projects.push(newProject);
  //   Projects.save($scope.projects);
  //   $scope.selectProject(newProject, $scope.projects.length-1);
  // }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  $scope.selectT = function(task,index){
    // console.log(task.title);
    $('.select_xzc').removeClass('act_ds');
    $('.select_xz').removeClass('act_ds');
    $('.select_xz').eq(index).addClass('act_ds');
    var useName=window.localStorage.getItem('userName');
    if(useName==null){
      var useName=$.cookie('userName');
    }
    var nav1=$('.nav_dh').attr('data-id');
    nav1=nav1.split(":");
    var links=$('.select_xz').eq(index).attr('data-id');
    var linkss=links.split(";");
    var link={
      "dbdK":linkss[0],
      "tt":linkss[1],
      "dbdcs":linkss[2]
    }
    link=JSON.stringify(link);
    var mq='nav_'+useName+'_'+nav1[1];
    var data={
      "mq":mq,
      "msg":link
    };
    console.log(data);
    // $http({
    //   method:"POST",
    //   url:"/send_mq",
    //   async: true,
    //   timeout : 1000*600,
    //   data:data,
    // }).success(function (data) {
    //     console.log(data);
    // }).error(function(data, status) {
    //    console.log(data);
    //    console.log(status);
    //  });

    $.ajax({
       type: "post",
       async: true,
       timeout : 1000*600, //超时时间设置，单位毫秒
       url: "/send_mq",
       data: data,
       success: function(response) {
           console.info(response);
          //getStatus();
       },
       error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
       }
    });
  };
  $scope.selectTC  = function(children,index){
    // console.log(children);
    $('.select_xz').removeClass('act_ds');
    var tit=children.title;
    for (var i = 0; i < $('.select_xzc').length; i++) {
      if($('.select_xzc').eq(i).text().indexOf(tit) !=-1){
        $('.select_xzc').removeClass('act_ds');
        $('.select_xzc').eq(i).addClass('act_ds');
        // var link=$('.select_xzc').eq(i).attr('data-id');
        // console.log(link);
        var link={
          "dbdK":children.dbdk,
          "tt":children.title,
          "dbdcs":children.cs
        }
        link=JSON.stringify(link);
      }
    }
    var useName=window.localStorage.getItem('userName');
    if(useName==null){
      var useName=$.cookie('userName');
    }
    var nav1=$('.nav_dh').attr('data-id');
    nav1=nav1.split(":");
    // var mq=useName+'_'+nav1[1];
    var mq='nav_'+useName+'_'+nav1[1];
    var data={
      "mq":mq,
      "msg":link
    };
    console.log(data);
    $.ajax({
       type: "post",
       async: true,
       timeout : 1000*600, //超时时间设置，单位毫秒
       url: "/send_mq",
       data: data,
       success: function(response) {
           console.info(response);
       },
       error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert(XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus);
       }
    });
  };
  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };


  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.out = function(){
    window.localStorage.removeItem('projects');
    window.location.href="index.fh5"
  };
  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length == 0) {
      alert('请重新登陆')
      window.location.href="index.fh5"
    }
  });

});
