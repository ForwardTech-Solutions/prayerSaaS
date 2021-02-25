/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      prayers {
        items {
          id
          title
          description
          groupID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        prayers {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrayer = /* GraphQL */ `
  query GetPrayer($id: ID!) {
    getPrayer(id: $id) {
      id
      title
      description
      groupID
      group {
        id
        name
        prayers {
          nextToken
        }
        createdAt
        updatedAt
      }
      answers {
        items {
          id
          prayerID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPrayers = /* GraphQL */ `
  query ListPrayers(
    $filter: ModelPrayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        groupID
        group {
          id
          name
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
      id
      prayerID
      prayer {
        id
        title
        description
        groupID
        group {
          id
          name
          createdAt
          updatedAt
        }
        answers {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        prayerID
        prayer {
          id
          title
          description
          groupID
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
