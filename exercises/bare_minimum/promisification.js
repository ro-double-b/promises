/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */ 

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync; // TODO


// (2) Asyncronous token generation
var generateRandomTokenAsync = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var getGitHubProfileAsync = function(user) {
  return new Promise(function (resolve, reject) {
    request.get('https://api.github.com/users/' + user, (err, res, body) => {
      if (!err) {
        console.log('resolving!!!!', body)
        resolve(body)
          .then((body));
      } else {
        console.log('errorrrrrrrrinnngnggggg', err)
        reject(err);
      }
    });


      // .catch(function() {

      // });
  //   return request.get(user) 
  //     .then(function(gitHubUser) {
  //       if (gitHubUser) {

  //       } else {
  //         return user
  //       }
  //     });
  // });
  });
};
// getGitHubProfileAsync.then(function(body) {
//   console.log('testfl;askdjfal;sdf', body)
// }, function(err) {
//   console.log('a;sldfjkas;ldf', err)
// })

// function(string) {
//  console.log('test')
  // new Promise( function(resolve, reject) {
  // });


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }
   
    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

var readFileAndMakeItFunnyAsync; // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
