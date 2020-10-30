import "./about.css";

import {
  GIT_USER,
  GIT_REPO,
  GIT_COMMITS_PER_PAGE,
  COMMITS_SLIDER,
  COMMITS,
  COMMITS_ERROR,
  COMMITS_CONTAINER,
} from "../js/constants/constants";

import GithubApi from "../js/modules/githubapi";
import CommitCardList from "../js/components/commitcardlist";
import CommitCard from "../js/components/commitcard";

const GITHUB_API = new GithubApi(GIT_USER, GIT_REPO, GIT_COMMITS_PER_PAGE);
GITHUB_API.getCommits();

const COMMIT_CARD = new CommitCard();

const COMMITCARD_LIST = new CommitCardList(
  COMMITS_CONTAINER,
  COMMITS_SLIDER,
  GITHUB_API,
  COMMIT_CARD,
  COMMITS,
  COMMITS_ERROR
);
COMMITCARD_LIST.getCommits();

