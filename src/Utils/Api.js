import axios from 'axios';

axios.defaults.baseURL = 'http://wbsod7yrybmp36pe.devcloud.acquia-sites.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

module.exports = {

  getToken: function(){
    var url = '?q=services/session/token';
    return axios.get(url)
      .then(function(token){
        return token;
      })
      .catch(function (response) {
        console.log(response);
      });
  },

  getCalendar: function(){
    var url = 'kalender/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  getEmployees: function(){
    var url = 'medewerkers/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  getEmployeeItem: function(Uid){
    var url = '?q=api/user/' + Uid +'.json'
    return axios.get(url)
      .then(function(response){
        console.log(response.data);
        return response.data;
      });
  },

  postEmployee: function(newEmployee){
    var token = this.getToken();
    axios({
      method: 'post',
      url: '?q=api/user.json',
      headers: {'X-CSRF-Token': token},
      data: newEmployee,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  putEmployee: function(newEmployee, Uid){
    var token = this.getToken();
    axios({
      method: 'put',
      url: '?q=api/user/'+ Uid +'.json',
      headers: {'X-CSRF-Token': token},
      data: newEmployee,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  deleteEmployee: function(Uid){
    let token = this.getToken();
    axios({
      method: 'delete',
      url: '?q=api/user/' + Uid +'.json',
      headers: {'X-CSRF-Token': token},
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  getProjects: function(){
    var url = 'projecten/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  getProjectItem: function(Nid){
    var url = '?q=api/node/' + Nid +'.json'
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  postProject: function(newProject){
    var token = this.getToken();
    axios({
      method: 'post',
      url: '?q=api/node.json',
      headers: {'X-CSRF-Token': token},
      data: newProject,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  putProject: function(newProject, Nid){
    var token = this.getToken();
    axios({
      method: 'put',
      url: '?q=api/node/'+ Nid +'.json',
      headers: {'X-CSRF-Token': token},
      data: newProject,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  deleteProject: function(Nid){
    let token = this.getToken();
    axios({
      method: 'delete',
      url: '?q=api/node/' + Nid +'.json',
      headers: {'X-CSRF-Token': token},
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  getApplications: function(){
    var url = 'aanvragen/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  deleteApplication: function(nid){
    let token = this.getToken();
    axios({
      method: 'delete',
      url: '?q=api/node/' + nid +'.json',
      headers: {'X-CSRF-Token': token},
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  getCosts: function(){
    var url = 'kosten/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  postCost: function(newCost){
    var token = this.getToken();
    axios({
      method: 'post',
      url: '?q=api/node.json',
      headers: {'X-CSRF-Token': token},
      data: newCost,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  getExpenditures: function(){
    var url = 'uitgaven/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  postExpenditure: function(newExpenditure){
    var token = this.getToken();
    axios({
      method: 'post',
      url: '?q=api/node.json',
      headers: {'X-CSRF-Token': token},
      data: newExpenditure,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  getTime: function(){
    var url = 'uren/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  getTimeItem: function(Nid){
    var url = '?q=api/node/' + Nid +'.json'
    return axios.get(url)
      .then(function(response){
        console.log(response.data);
        return response.data;
      });
  },

  deleteTimeItem: function(nid){
    let token = this.getToken();
    axios({
      method: 'delete',
      url: '?q=api/node/' + nid +'.json',
      headers: {'X-CSRF-Token': token},
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  postTime: function(newTime){
    var token = this.getToken();
    axios({
      method: 'post',
      url: '?q=api/node.json',
      headers: {'X-CSRF-Token': token},
      data: newTime,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  getEntities: function(){
    var url = 'entiteiten/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  postEntity: function(newEntity){
    var token = this.getToken();
    axios({
      method: 'post',
      url: '?q=api/node.json',
      headers: {'X-CSRF-Token': token},
      data: newEntity,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  putEntity: function(newEntity, Nid){
    var token = this.getToken();
    axios({
      method: 'put',
      url: '?q=api/node/'+ Nid +'.json',
      headers: {'X-CSRF-Token': token},
      data: newEntity,
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  deleteEntity: function(nid){
    let token = this.getToken();
    axios({
      method: 'delete',
      url: '?q=api/node/' + nid +'.json',
      headers: {'X-CSRF-Token': token},
    })
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}
