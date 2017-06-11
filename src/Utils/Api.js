import axios from 'axios';

axios.defaults.baseURL = 'http://wbsod7.dev.dd:8083';
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

  getEmployees: function(){
    var url = 'medewerkers/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  getEntities: function(){
    var url = 'entiteiten/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  getProjects: function(){
    var url = 'projecten/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  getApplications: function(){
    var url = 'aanvragen/json';
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  getCosts: function(){
    var url = 'kosten/json';
    return axios.get(url)
      .then(function(response){
        console.log(response.data);
        return response.data;
      });
  },

  getExpenditures: function(){
    var url = 'uitgaven/json';
    return axios.get(url)
      .then(function(response){
        console.log(response.data);
        return response.data;
      });
  },

  getTime: function(){
    var url = 'uren/json';
    return axios.get(url)
      .then(function(response){
        console.log(response.data);
        return response.data;
      });
  }

}
