---
title: "Angular: The ng-container Element"
published: 2023-06-10
summary: When should you use the ng-container element. What are its benefits and when should you avoid using it.
thumbnail: /blog/thumbnails/containers.webp
---

## Story

Imagine you want to create a web application for a shoe store. As framework of choice, you are using Angular and you got the following requirements. You have three kinds of visitors for the site: admins, supervisors and users. Admins and supervisors see more areas on the site as normal users. Furthermore, the site should list all available shoes the store has to offer. The following sections explain the core concepts, how to use structural directives.

## Structural Directives

The concept of directives in Angular is compelling. You can add behaviours directly to elements in your Angular templates via custom attributes. They are especially useful, if you want to organise a complex template structure. Any directive which changes the DOM layout is called a structural directive. You can spot them by the * in the front. For example, the *ngIf directive allows you to use a condition when to show or hide the corresponding element, depending on the given boolean value. The following text is only visible to users which have the role admin:

```html
<p *ngIf="hasAdminRole">
  You see this area, because you are an admin on this site.
</p>
```

An important note here is, that this is **no** proper security mechanism. Its only purpose is to improve the user experience by hiding elements, which are not useful to see on the page because the user doesn't have the required rights. Additionally, a proper role system has to be implemented at your backend services.

## Multiple elements

But the admin area could have more elements than one simple text. For example, it would be quite nice if it had a catchy title. Using the knowledge from the last section, you could extend the template to the following:

```html
<h2 *ngIf="hasAdminRole">Admin Area</h2>
<p *ngIf="hasAdminRole">
  You see this area, because you are an admin on this site.
</p>
```

If the visitors of the web application have admin rights, the title and the text
are visible to them. Although this works, it is redundant and damages maintainability. Imagine you build a complex admin area with hundreds of elements and custom components, and you want to change their condition of visibility, you would need to change it all over the place. Therefore, let's wrap the admin area with an element without further semantically meaning, like an ordinary `<div>`. The code looks then as follows:

```html
<div *ngIf="hasAdminRole">
  <h2>Admin Area</h2>
  <p>You see this area, because you are an admin on this site.</p>
</div>
```

The maintainability challenged is solved, but now there are two new ones. Every DOM node requires some kind of resources on the visitors' devices. In a small example, it doesn't make a lot of a difference, but if you have thousands of elements on the web application it quickly adds up. As a rule of thumb, every DOM node should benefit the user experience. The second issue with this solution is, that if you already created a styling for the admin area, you need to rethink it due to the introduction of the wrapping element. Luckily, the special Angular element `<ng-container>` helps in this situation. You can consider it to be a container in your Angular template, which will not occur in the resulting browser DOM. You cannot style or query the non-existing DOM node, but you can use it with structural directives in the Angular template. Applying the special element to the code from the previous example, it looks like this:

```html
<ng-container *ngIf="hasAdminRole">
  <h2>Admin Area</h2>
  <p>You see this area, because you are an admin on this site.</p>
</ng-container>
```

This allows now to group the heading and paragraph elements so that you only have to use a single `*ngIf` directive. The maintainability is high, and there are no unnecessary DOM nodes rendered on the users devices, which harm the performance of the application.

## Multiple structural directives

Structural directives are a powerful tool in your toolchain. But they have the limitation that only a single structural directive is allowed at each element. But often times our conditions are much more complex than a single boolean property. Let's say you want to show the area not only to admins, but also to visitors with the supervisor role. You cannot use multiple `*ngIf` directives, but you can merge their conditions, as follows:

```html
<ng-container *ngIf="hasAdminRole || hasSupervisorRole">
  <h2>Admin & Supervisor Area</h2>
  <p>
    You see this area, because you are an admin or a supervisor on this site.
  </p>
</ng-container>
```

This completes the first requirement for the web application of the shoe store. The second one was to list all the names of available shoes the store has to offer. Let's start by showing all the shoes. Now, sadly HTML has no possibility to handle loops, so that a direct iteration in HTML is not possible. But Angular ships with another useful structural directive named `*ngFor`. The following code shows the iteration over all shoes.

```html
<p *ngFor="let shoe of shoes">{{shoe.name}}</p>
```

That was easy. There is no need to introduce an additionally `<ng-container>` element because the shoe name is the only child of the paragraph node. Now, how to display just the available shoes? As mentioned earlier, `*ngIf` cannot be added to the paragraph because only one structural directive is allowed at each element. But, with the help from the previous example to nest structural directives, the desired result occurs:

```html
<p *ngFor="let shoe of shoes">
  <span *ngIf="shoe.inStock>0">{{shoe.name}}</span>
</p>
```

Only available shoes are visible (more than one item in stock) on the website. However, the browser DOM contains unnecessary nodes of empty paragraphs because a paragraph is created for each shoe, but its name is only added if the shoe is available. Using `<ng-container>` resolves the problem and improves the performance by preventing empty paragraphs.

```html
<ng-container *ngFor="let shoe of shoes">
  <p *ngIf="shoe.inStock>0">{{shoe.name}}</p>
</ng-container>
```

The `<ng-container>` element allows using the \*ngFor structural directive without creating DOM nodes, such that only paragraphs for available shoes will appear.

## Summary

Using structural directives right is hard. This post shows the correct use of them with the special element `<ng-container>`. In sum, you should use `<ng-container>` either if you want to group multiple element together in the Angular template, but not in the resulting browser DOM or if you need multiple structural directives on the same element. In all other cases, you can use the structural directives on the elements directly.

### Further Reading

- Angular Documentation about [\*ngIf](https://angular.io/api/common/NgIf) & [\*ngFor](https://angular.io/api/common/NgFor)
- Angular Documentation about [ng-container](https://angular.io/api/core/ng-container)
- Angular Documentation about [directives](https://angular.io/api/core/Directive)
- Angular Documentation about [structural directives](https://angular.io/guide/structural-directives)
