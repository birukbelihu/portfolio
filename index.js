function toggleDarkMode() {
    document.body.classList.toggle('dark');
}

fetch('https://api.github.com/users/BirukBelihu')
    .then(response => response.json())
    .then(user => {
        document.querySelector('.profile-img').src = user.avatar_url;
        document.querySelector('.username').textContent = `${user.login} - Overview`;
        document.querySelector('.description').textContent = `${user.name || user.login} has ${user.public_repos} repositories available. Follow their code on GitHub.`;
    });

fetch('https://api.github.com/users/BirukBelihu/repos')
    .then(response => response.json())
    .then(repos => {
        const container = document.getElementById('projectList');
        repos
            .filter(repo => !repo.fork) // Exclude forked repos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .forEach(repo => {
                const project = document.createElement('div');
                project.className = 'project';
                project.innerHTML = `
          <a href="${repo.html_url}" target="_blank">
            ${repo.name}
          </a>
          <p>${repo.description || 'No Description Available.'}</p>
          <div class="meta">
            Language: ${repo.language || 'N/A'} | ★ ${repo.stargazers_count}
          </div>
        `;
                container.appendChild(project);
            });
    })
    .catch(error => {
        console.error("Unable To Fetch GitHub Repositories Due To", error);
        document.getElementById('projectList').innerHTML += `<p>Unable To Load Projects.</p>`;
    });
