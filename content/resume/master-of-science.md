---
title: "JANI2PINS: The JANI front-end module for the LTSmin toolset"
published: "2024-09-08"
---

In our increasingly interconnected world, people communicate in a variety of
ways—through spoken language, gestures, and shared symbols. These methods allow
for seamless information exchange across different cultures and contexts.
However, in the world of model checking—a field dedicated to verifying the
correctness of systems—the lack of a common language has created significant
challenges.

Different model checkers, such as CADP for distributed systems, UPPAAL for timed
automata, and PRISM for probabilistic models, all use distinct input formats.
Comparing the results from these tools requires in-depth knowledge of their
unique formalisms or complex conversions using third-party programs. This
fragmented landscape makes it difficult to assess model checkers' capabilities
consistently and efficiently.

Enter JANI, a model format designed to bridge this gap. While primarily focused
on probabilistic models, JANI also supports formats like timed automata. What
sets it apart is its accessibility—written in the familiar JSON format, JANI
models are both human-readable and machine-friendly. Not only do they store the
models themselves, but they also include properties to be tested, making them
ideal for automatic model checking across different systems.

By integrating more model checkers into the JANI format, we can create a shared
language for model checking, simplifying comparison across tools. One such
integration is the LTSmin toolset, which focuses on labeled transition systems
and excels in optimizing memory and time for model checking tasks. LTSmin is
flexible enough to allow new front-ends for additional languages, making it an
excellent candidate for connection with JANI.

My thesis introduced
[JANI2PINS](https://dgit.cs.uni-saarland.de/s8lsschi/jani2pins), a Python-based
implementation that links LTSmin with the JANI format. Notably, JANI2PINS fully
supports JANI’s WebSocket protocol, enabling seamless model exchanges between
clients and servers without requiring manual setup of the model checkers. This
greatly simplifies integration and allows users to access multiple model
checkers via a unified interface.

In this thesis the implementation details are followed by an in-depth
exploration of the JANI specification, highlighting which components can be
transformed for use in LTSmin. Finally, the accuracy of these transformations is
verified through consistency checks with the original JANI models.
