---
title: GraphQL浅入浅出
date: 2020-06-22 18:09:48
tags: GraphQL
---

## 前言

GraphQL 作为目前较为🔥的一款 API 查询语言，是一款比较新颖、友好的新技术。

网上大多数会将 GraphQL 和 RESTful API 对比，的确，GraphQL 的出现，离不开 RESTful API，GraphQL 解决了 RESTful 一些弊端，比如当业务接口复杂的时候，会有大量的接口地址，同时对接口命名也加大了难度。

但是，GraphQL 并不等于 RESTful，RESTful 时一种风格约定，具体实现则完全根据开发者来决定。而 GraphQL 则是一种查询语言，最直接的表现就是你需要安装相应的依赖才可以使用。

> 我在实际项目中使用 RESTful 风格开发接口的时候，往往会遇到接口命名、复杂接口较难遵循 RESTful 风格。
> 网上给出的示例清一色都是简单示例，比如你无法较好的处理下面这几种接口：当删除一个用户的时候，会出现不同的角色，不同角色删除需要的参数、结果返回都不同。

本文相关代码：[GitHub - imhxc/egg-graphql-example: graph 浅入浅出](https://github.com/imhxc/egg-graphql-example)

## 没有 GraphQL 的时候，我是如何开发的？

/该段落只是记录了我自己在没有使用 GraphQL 开发中遇到的痛点，你可以选择跳过/

在 Egg、Koa，以及一些 php 框架等，相信你都见过如下几个目录或文件：

* router
* controller
* model
* service
* public

没错，这是最常见的 MVC 模式，将路由、控制器、模型层等进行了分离。

> 也有其他的模式，但基本都差不多，大体结构都是将每个功能、模块进行目录划分。

上面这种结构划分在较为简单的项目中用起来得心应手，但是同样遇到一个问题，当项目较为复杂，接口甚至达到上百个的时候，这种划分会显得极其臃肿；

往往你为了修改或添加一个功能，要去操作不同目录下的不同文件。

> 有时候我也会陷于另一种困境，比如：查询某个班级下的所有学生，你不知道是要将这个操作和接口写到 `clazz.js` 文件中，还是 `student.js` 文件中。
> 简单来说，就是当遇到一个功能设计两个或以上的表的时候，你无法很好的决定这个操作应该放到哪个文件中。


## GraphQL 基本理解

在 GraphQL 中，我们一般有以下三种结构（文件）：

* schema
* resolver
* connector

在 GraphQL 中，*没有 router* ，任何行为的接口都使用同一个接口，GraphQL 会根据我们传递的参数不同自行处理，这也就是解决了前面提到的 RESTful 接口太多的问题。


### Schema

Schema 是 GraphQL 中对数据的描述，与 TypeScript 中的类型定义有点类似。

我们会从其基本结构和两个特殊类型去了解。

#### Schema 的基本结构

````
enum Gender {
  MALE
  FEMALE
  NONE
}
type User {
  name: String!
  gender: Gender!
  tags: [String!]!
}
````

如果你使用过 TypeScript ，上面代码不难理解，无非就是定义了一个 User 对西那个类型和一个 Gender 枚举类型。

这里需要额外了解的是 `!` 、`[]`  这两个个符号：

* `!`  ：表示该字段不为空；
* `[]`：表示该字段是一个数组；
* `[String!]!`： 表示该字段是一个数组，数组内不为空，而且该字段也不为空。


#### Schema 的两个特殊对象类型

两个特殊类型分别是 `Query` 和 `Mutaion`，即查询和变更类型。

每一个 GraphQL 服务都有一个 Query 类型，可能会有一个  Mutation 类型；Query 用于查询数据，Mutation 用于创建或变更数据。

之所以被称为特殊类型，是因为这两个类型有其特定的含义，你可以理解为类似程序中的保留关键字；

*这两个特殊类型定义个每一个 GraphQL 服务的入口*。

##### Query 对象类型

````
# 在 schema 中定义
type Query {
  # 查询所有用户
  users: [User!]!
  # 根据 name 查询对应的用户信息
  user(name: String!): User
}
````

这里，我们在 schema 中定义了一个 Query 对象类型，其中 `user` 和 `users` 为两个方法，分别用于查询所有用户和单个用户。

##### Mutation 对象类型

````
# 在 schema 中定义
input UserInput {
  name: String!
  gender: Gender! # 前面已经定义了 Gender
  tags: [String!]!
}

type Mutation {
  createUser(user: UserInput!): User!
}
````

`input` 表示输入对象，和普通对象一样，只是关键字是 `input`  而不是 `type` ；它的特别之处在于，输入对象可以用在复杂的参数重，经常是 `mutation`  参数，比如上面的代码。


### Resolver

前面我们定义列一些 Schema，定义好之后，我们就需要 resolver 来对其进行操作。

在 GraphQL 中，每个类型的每个字段都由一个 resolver 函数支持，当一个字段被执行的时候，相应的 resolver 会被调用以产生下一个值。

你可以理解为 resolver 等于 RESTful 中的 controller，resolver 函数是对 GraphQL 入口的实现。

#### Query

我们这里根据前面定义的 schema 来编写两个 resolver 函数：

````
const resolvers = {
  Query: {
    // 对应 schema 中定义的 Query 类型中的 users
    users: () => {
      return [
        {
          name: 'Jack',
          gender: 'MALE',
          tags: ['随和', '平易近人', '善良']
        },
        {
          name: 'Tome',
          gender: 'NONE',
          tags: ['乐于助人', '最强大脑']
        },
      ]
    },
    // 对应 schema 中定义的 Query 类型中的 user
    user: (_root, args) => {
      const { name } = args;
      return {
        name,
        gender: 'MALE',
		  tags: ['随和', '平易近人', '善良'],
      }
    }
  }
}
````

到此，我们定义了两个 Query 类型的 resolver 函数，通过访问相应的 graph 接口地址就可以获得正确的数据。

*查询示例：*

````
{
  users{
    name
    gender
    tags
  }
}
````

你可以自由删减 `name`、`gender `、`tags` 这三个属性，GraphQL 服务会自动返回相应的数据。


#### Mutation

前面定义了 Query 查询，但是实际业务不可能只有查询，也会存在修改操作，Mutation 就是负责修改操作的。

在前面，我们已经定义了如下 schema：

````
# 同样在 schema 中定义 mutation 操作
type Mutation {
  createUser(user: UserInput!): User!
}
````

我们只需要在 resolver 中定义 Mutation 相关的函数即可：

````
// 在 resolver 中定义
export default {
  Query: {
	  // ...
  },
  Mutation: {
    createUser: (_root, args) => {
      const { user: { name, gender, tags } } = args;
      return {
        name,
        gender,
        tags,
      };
    },
  },
}
````

我们在讲 Mutation 和 Query 定义在了一起，因为都属于 resolver 函数。

到此。你在浏览器中输入 graph 服务地址，输入如下：

````
mutation{
  createUser(user: {
    name: "二狗蛋",
    gender: MALE,
    tags: ["狗蛋子", "二狗子", "狗剩子"]
  }){
    name
    gender
    tags
  }
}
````

至此，你已经学会了 GraphQL 基本的查询、修改操作。


## 总结

GraphQL 具有两个特殊类型，分别是 Query 和 Mutation，负责查询和修改；

同时 Mutation 没有 router，GraphQL 服务会根据你的查询语法自行调用相关函数。