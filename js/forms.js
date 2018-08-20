/* 
 * Copyright (C) 2013 peredur.net
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function  maximum(a,b){
    return a > b?a:b;
}

function similar_text (first, second, percent) {
  
    if (first === null ||
      second === null ||
      typeof first === 'undefined' ||
      typeof second === 'undefined') {
      return 0
    }
  
    first += ''
    second += ''
  
    var pos1 = 0
    var pos2 = 0
    var max = 0
    var l1 = first.length
    var l2 = second.length
    var i
    var j
    var l
    var sum
  
    for (i = 0; i < l1; i++) {
      for (j = 0; j < l2; j++) {
        for (l = 0; (i + l < l1) && (j + l < l2) && (first.charAt(i + l) === second.charAt(j + l)); l++) { // eslint-disable-line max-len
          // @todo: ^-- break up this crazy for loop and put the logic in its body
        }
        if (l > max) {
          max = l
          pos1 = i
          pos2 = j
        }
      }
    }
  
    sum = max
  
    if (sum) {
      if (pos1 && pos2) {
        sum += similar_text(first.substr(0, pos1), second.substr(0, pos2))
      }
  
      if ((pos1 + max < l1) && (pos2 + max < l2)) {
        sum += similar_text(
          first.substr(pos1 + max, l1 - pos1 - max),
          second.substr(pos2 + max,
          l2 - pos2 - max))
      }
    }
  
    if (!percent) {
      return sum
    }
  
    return (sum * 200) / (l1 + l2)
  }

function formhash(form, password) {
    // Create a new element input, this will be our hashed password field. 
    var p = document.createElement("input");

    // Add the new element to our form. 
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);

    // Make sure the plaintext password doesn't get sent. 
    password.value = "";

    // Finally submit the form. 
    form.submit();
}

function regformhash(form, uid, email, password, conf) {
    // Check each field has a value
    var pass = password.value
    
    if (uid.value == '' || email.value == '' || password.value == '' || conf.value == '') {
        alert('You must provide all the requested details. Please try again');
        return false;
    }
    
    var userid = uid.value

    // Check the username
    re = /^\w+$/; 
    if(!re.test(form.username.value)) { 
        alert("Username must contain only letters, numbers and underscores. Please try again"); 
        form.username.focus();
        return false; 
    }
    
    // Check that the password is sufficiently long (min 6 chars)
    // The check is duplicated below, but this is included to give more
    // specific guidance to the user
    if (password.value.length < 6) {
        alert('Passwords must be at least 6 characters long.  Please try again');
        form.password.focus();
        return false;
    }
    
    // At least one number, one lowercase and one uppercase letter 
    // At least six characters 
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 
    if (!re.test(password.value)) {
        alert('Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again');
        return false;
    }
    
    // Check password and confirmation are the same
    if (password.value != conf.value) {
        alert('Your password and confirmation do not match. Please try again');
        form.password.focus();
        return false;
    }
        
    // Create a new element input, this will be our hashed password field. 
    var p = document.createElement("input");

    var common=["123456","123456789","qwerty","12345678","111111","1234567890","1234567","password","123123","987654321","qwertyuiop","mynoob","123321","666666","18atcskd2w","7777777","1q2w3e4r","654321","123456Ab","555555","3rjs1la7qe", "google","1q2w3e4r5t","123qwe","zxcvbnm","1q2w3e"]
    var num = common.length

    var match = 0

    for( var i = 0; i < num; i++){
        match = maximum(similar_text(common[i],pass,true),match)
        match = maximum(similar_text(pass,common[i],true),match)
    }
    
    if ( match > 60){
        alert('Your password strength is weak:(Try a strong password');
        form.password.focus();
        return false;
    }

    if ( userid == pass){
        alert('Your password should not be your username. Please choose a different password');
        form.password.focus();
        return false;
    }


    // Add the new element to our form. 
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);

    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
    conf.value = "";

    // Finally submit the form. 
    form.submit();
    return true;
}
