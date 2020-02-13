console.log('Before');
getUser(1, getRepositoriesFunction);
console.log('After');

function getRepositoriesFunction(user) {
  getRepositories(user.gitHubUsername, getCommitsFunction);
}

function getCommitsFunction(repos) {
  getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database....');
    callback({ id: id, gitHubUsername: 'shihab' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Calling Github API....');
    callback(['repo1', 'repo2', 'repo3', 'repo4']);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    callback(['commit1', 'commit2', 'commit3']);
  });
}
