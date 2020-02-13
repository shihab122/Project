console.log('Before');
getUser(1, user => {
  getRepositories(user.gitHubUsername, repos => {
    getCommits(repos[0], commits => {
      console.log(commits);
    });
  });
});
console.log('After');

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
  }, 2000);
}
