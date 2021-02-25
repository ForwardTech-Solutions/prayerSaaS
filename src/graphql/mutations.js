/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
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
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
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
export const createPrayer = /* GraphQL */ `
  mutation CreatePrayer(
    $input: CreatePrayerInput!
    $condition: ModelPrayerConditionInput
  ) {
    createPrayer(input: $input, condition: $condition) {
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
export const updatePrayer = /* GraphQL */ `
  mutation UpdatePrayer(
    $input: UpdatePrayerInput!
    $condition: ModelPrayerConditionInput
  ) {
    updatePrayer(input: $input, condition: $condition) {
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
export const deletePrayer = /* GraphQL */ `
  mutation DeletePrayer(
    $input: DeletePrayerInput!
    $condition: ModelPrayerConditionInput
  ) {
    deletePrayer(input: $input, condition: $condition) {
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
export const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
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
export const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
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
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
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
