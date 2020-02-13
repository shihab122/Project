function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Reading a user from a database....');
      resolve({ id: 1, gitHubUsername: 'shihab' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Calling Github API as ${username}....`);
      resolve(['repo1', 'repo2', 'repo3', 'repo4']);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Get commits from ${repo}.....`);
      resolve(['commit1', 'commit2', 'commit3']);
    }, 2000);
  });
}

function getError(commit) {
  return new Promise(reject => {
    setTimeout(() => {
      console.log(`Something faild in ${commit}.....`);
      reject(new Error('Filed to execute operation'));
    }, 2000);
  });
}

async function displayCommits() {
  const user = await getUser(1);
  const repos = await getRepositories(user.gitHubUsername);
  const commits = await getCommits(repos[0]);
  console.log(`Commits: ${commits}`);
}

displayCommits();

async function displayError() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    const error = getError(commits[0]);
    console.log(`Commits: ${commits}`);
  } catch (error) {
    console.log(error.message);
  }
}
displayError();
