import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
        edges {
        node {
         author {
            bio
            name
            id
            photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        category {
          name
          slug
        }
      }
    }
  }
}
    
`;

const result = await request(graphqlAPI, query)

return result.postsConnection.edges;
};

{/*export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        category {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};*/}

export const getPostDetails = async (slug) => {

  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url 
            }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
        url
        }
        category {
          name
          slug
        }
        content {
        raw
        }
      }
      
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
  
};


export const getRecentPosts = async () => {
    const query = gql`
    query GetPostDetails {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

//Don't display some articles but only ones that viewer wants related to category
export const getSimilarPosts = async (slug, categories) => {
  const query = gql`
  query GetRelatedPosts($slug: String!, $categories: [String!]) {
    posts(
      where: {
        slug_not: $slug,
        AND: { category_some: { slug_in: $categories } }
      }
      last: 3
    ) {
      title
      slug
      featuredImage {
        url
      }
      createdAt
    }
  }
`;

const result = await request(graphqlAPI, query, { slug, categories });
return result.posts;
};

export const getCategories = async () => {
    const query = gql`
    query GetCategories {
        categories {
          name
          slug
        }
    }
  `; 

  const result = await request(graphqlAPI, query);
  return result.categories;
}

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};


export const getCategoryPost = async (slug) => {
  const query = gql`
  query GetCategoryPost($slug: String!) {
    postsConnection(
      where: { category_some: { slug: $slug } }
    ) {
      edges {
        node {
          title
          slug
          excerpt
          featuredImage {
            url
          }
          author {
            name
            bio
            photo {
              url
            }
          }
          category {
            name
            slug
          }
        }
      }
    }
  }
`;
  
   try {
    const result = await request(graphqlAPI, query, { slug });
    console.log("GraphQL result:", result);
    return result.postsConnection.edges.map(edge => edge.node);
  } catch (error) {
    console.error("GraphQL error:", error.response?.errors || error.message);
    return [];

  }
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPosts {  
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

