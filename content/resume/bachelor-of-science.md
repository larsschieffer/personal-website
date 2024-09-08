---
title: "Numeric Representation of Probability Density Functions"
published: "2024-09-08"
---

In my thesis, I explore the concept of the Numeric Density Function, first
introduced by W. Kleinöder. This representation uses numeric values to model
probability density functions, offering an efficient way to perform operations
like the convolution of distributions. Essentially, the function condenses a
probability density into a finite number of values, each calculated using
integrals of equal width. By adjusting the width, one can control the precision
of the stored values. These functions play a crucial role in tools like PEPP.

PEPP (Performance Evaluation of Parallel Programs), developed by Franz Hartleb
and his team, estimates the execution time of parallel programs using a
stochastic graph model. In this model, each task is represented as a node, and
random variables, associated with probability density functions (and their NDF
representation), are used to simulate execution times.

For my thesis, a working implementation of the NDF approach was developed,
featuring a user interface created in Java. This tool can generate NDFs for
exponential and Erlang distributions while maintaining accuracy within a certain
error margin. Along with binary operators like convolution, minimum, and
maximum, the tool can simulate phase-type distributions via the Cox
representation. The thesis outlines the mathematical principles behind NDFs,
details the implementation, and describes the user interface and its features.
