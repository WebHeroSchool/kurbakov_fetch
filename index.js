const div = document.getElementById('div');
const query = window.location.search;

const setAttrs = (elem, attrs) => {
  if (typeof attrs === 'object' && attrs instanceof Object) {
    for (let key in attrs) {
      elem[key] = attrs[key];
    }
    return true;
  }
  return false;
};

const loadFailed = () => {
  const h3 = document.createElement('h3');
  setAttrs(h3, {
    textContent: 'Информация о пользователе не доступна'
  });
  div.appendChild(h3);
};

const loadSuccess = (avatar_url, bio, html_url, name) => {
  if (avatar_url) {
    const img = document.createElement('img');
    setAttrs(img, {
      height: 300,
      width: 300,
      src: avatar_url
    });
    div.appendChild(img);
  }
  if (name) {
    const a = document.createElement('a');
    setAttrs(a, {
      href: html_url || '',
      target: '_blank',
      textContent: name
    });
    a.style.display = 'block';
    div.appendChild(a);
  }
  if (bio) {
    const p = document.createElement('p');
    setAttrs(p, {
      textContent: bio
    })
    div.appendChild(p);
  }
  return true;
};

const getUserData = data => {
    const {avatar_url, bio, html_url, message, name} = data;

    if (message && message === 'Not Found') {
      loadFailed();
    } else {
      loadSuccess(avatar_url, bio, html_url, name);
    }
};

if (query) {
    const username = new URLSearchParams(query).get('username');
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => getUserData(data))
      .catch(e => console.log(e));
}
