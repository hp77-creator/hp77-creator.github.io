---
title: TIL - Git worktree & WCGW even after Server processes request sucessfully
date: 2025-03-28
description: Learning more on internals of Git & Web Server 
visible: true
tags: git, java, spring-boot
---

I am currently working on an internal tool where I am tasked with creating a microservice to interact with a client. Tech stack that we use in my organization
is mostly in Java(Spring-boot). Spring-boot is such a powerful and beautiful framework. You can create servers so easily. It's IOC(Inversion of
control) paradigm, it's autoconfiguration and dependency management all lead to a wonderful developer experience.

I mapped an endpoint in my controller like following:
```java

@PostMapping("/post/text")
public ResponseEntity<Text> addText(@Valid @RequestBody RequestBody request) {
    return Response.ok(dependentService.addText(request));
}
```
It was a pretty simple endpoint, and in the service implementation, I was simply saving whatever the user was sending from their end, ofc with validations.
I ran the server, It compiled and then executed without any error, Server was up. I hit my create request using an http client, 
I observed a strange thing, I see that server is returning me a `500` with some `Internal Server Exception`, I thought let's check the server logs, there might
be something that I missed.
To my shock, there was nothing in server logs, nada. It baffled me even more, I was like what went wrong here. I put some debugger points and checked with that, inside service, function is returning expected response, inside controller, If I execute the return statement separately, using `Evaluate expression` of IntelliJ, I see correct response, so I continue the execution and again same error.

Well, At this point, I was questioning my configuration, did I mess up anything there, I don't know, I looked around, took reference from other services, I was 
following what should be followed but I was getting error meanwhile other services were working fine and worst part, I didn't know from where the error was coming. I approached with this problem to my colleague, they mentioned they have seen this same issue before, they suggested to add a configuration for `ObjectMapper`, of course, the error must be happening in the serialization layer, logs for that are not shown by default. To see that, I added following lines in the 
`application.properties`
```
logging.level.org.springframework.web=debug
logging.level.com.fasterxml.jackson.databind=debug
```
And indeed, Error was occuring because of a model mismatch. I fixed that model and then the issue was resolved. This incident made me realize how much we take 
for granted different abstractions that frameworks provide, It prompted me to always think in terms of first principle whenever we get stuck and look beyond 
abstractions provided by your framework.

---

Git Worktree

Have you ever had a project, where you were working on a branch, you have some changes which are not committed but then you receive a requirement which needs a new branch from your `main`. What would you do in this case?

Before today, I would have done `git stash`, switch `HEAD` to `main` and then create another branch from there and work on the higher priority feature/fix. 
But Today I learned that there exists something like `git worktree` and it is such a wonderful command. Essentially it creates a new repo for you from your existing git objects from the branch that you mention, example:
```shell
git worktree add -b emergency-fix ../temp master
```
Above command will create a new repo in your parent directory with name `temp` and switch to `emergency-fix` branch and you can simply `cd` or (`pushd`) into it and start working on your fix, when 
done you can simply commit from the new directory and then switch back to your old directory.

This command legit helps you have multiple context for your project, It extends the concept of branch, I was reading more about it in `Mastering Git` and during
my read, I learnt that it has been there for long time and It was shock for me that during my entire college years and now dev years, I didn't see it being 
mentioned much. 
I am modifying my git workflow to include this command and have better separation for concern for different features. Features like this make you realize how much you don't know about some of the tools that you think you might be knowing a lot. Answer is to always `Stay curious`.

Also, Would like to mention that when you change your directory, you might have to reinstall your dependencies which you normally ignore, example `venv` dir in `python` and `node_modules` in `Javascript`

---- 

## References

- [Mastering Git](https://www.amazon.in/Mastering-Git-Jakub-Narebski/dp/1783553758)
- [Git Worktree documentation](https://git-scm.com/docs/git-worktree)
