/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
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
export const onCreatePrayer = /* GraphQL */ `
  subscription OnCreatePrayer {
    onCreatePrayer {
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
export const onUpdatePrayer = /* GraphQL */ `
  subscription OnUpdatePrayer {
    onUpdatePrayer {
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
export const onDeletePrayer = /* GraphQL */ `
  subscription OnDeletePrayer {
    onDeletePrayer {
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
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer {
    onCreateAnswer {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer {
    onUpdateAnswer {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer {
    onDeleteAnswer {
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
