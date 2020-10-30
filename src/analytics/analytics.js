import "./analytics.css";

import {
  STATS_KEYWORD,
  STATS_PER_WEEK,
  STATS_NUMBER_OF_MENTIONS,
  STORAGE_DATA,
  GRAPH_HEADING_DATE,
  GRAPH_DATES,
  GRAPH_BARS,
} from "../js/constants/constants";

import Statistics from "../js/components/statistics";

const STATISTICS = new Statistics(
  STORAGE_DATA,
  STATS_KEYWORD,
  STATS_PER_WEEK,
  STATS_NUMBER_OF_MENTIONS,
  GRAPH_HEADING_DATE,
  GRAPH_DATES,
  GRAPH_BARS
);
STATISTICS.renderStatistics();



