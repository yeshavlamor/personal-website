---
title: "Attention is all you need"
excerpt: "My notes on the Transformers Architecture"
date: "2025-06-18"
category: "tech"
---

# The Transformers Architecture 

If you've been anywhere near AI in the last few years, you've probably heard about Transformers. No, not the robot movie kind (though they were pretty cool). The architecture comes from a 2017 research paper titled *"Attention Is All You Need"*, and it spurred frenzy in the AI world.

So, why was it groundbreaking? Let's break it down.

## Traditional Transduction models: RNNs and CNNs
Before Transformers, traditional transduction sequence models relied on Recurrent Neural Networks [(RNN)](https://www.geeksforgeeks.org/machine-learning/introduction-to-recurrent-neural-network/) or Convolutional Neural Networks [(CNN)](https://www.geeksforgeeks.org/machine-learning/introduction-convolution-neural-network/). 

*Transduction models*: Takes one form of sequential data and transforms it to another sequence. Kind of like a translator/convertor.
> Example: "Hello, how are you?" (English) -> "Hola, ¿cómo estás?" (Spanish)

**RNNs** read one word at a time, keeping memory of what came before. Like reading a book one word at a time, trying to remember every single detail from the beginning. By the time you hit page 200, remembering exactly what was on page 1 is… hard. This is coined the [Vanishing Gradient Problem](https://www.geeksforgeeks.org/deep-learning/vanishing-and-exploding-gradients-problems-in-deep-learning/), long-range dependencies get fuzzy.

**CNNs** were better at spotting local features, like edges in an image, but they still looked at things in "windows." Like examining a giant painting through a small cut-out frame: you see details, but it's hard to appreciate the whole masterpiece at once.

Both had another big drawback in that they processed information **sequentially**, making training these models a slow, painstaking process.

## The Saving Grace: Transformers

Transformers flipped the script. No recurrence. No convolutions. But **Attention Mechanisms**

Instead of trudging word by word, Transformers look at all the words at once. They can connect "cat" in the first sentence to "it" 50 words later instantly. This parallelism not only speeds up training but also makes it way easier to capture long-range relationships.

In short:

- **RNNs** were like reading word by word and struggling with memory
- **CNNs** were like peeking at a painting through small little frames  
- **Transformers** let you see everything *at once*

## How Attention Mechanisms Work (Without Too Much Math)

The general idea here is that every word asks: *"Which other words in this sentence matter the most to me?"*. It then takes into account the relative importance of every other word and embeds this information into its own numeric representation. 

Attention is derived from three important variables: Queries, Keys and Values. 

The Q/K/V concept is analogous to retrieval systems. For example, when you search for videos on YouTube, the search engine will map your **query** (text in the search bar) against a set of **keys** (video title, description, etc.) associated with videos in the database, then present you the best matched videos (**values**) [(useful discussion)](https://stats.stackexchange.com/questions/421935/what-exactly-are-keys-queries-and-values-in-attention-mechanisms)

In the context of Transformers:
- **Query (Q)**: the search question that the current word is asking
- **Key (K)**: the searchable attributes that each word can be matched against  
- **Value (V)**: the actual information content that gets retrieved and mixed together

## Example: "Tom eats fish" (More Math Involved Here)
Attention can be calculated using the following formula:
![Project image](/writings/attention_formula.png)

Let's zoom into how attention updates the word "eats" using sample values. 

(Q) Query ("eats" asks "who do I relate to?"): Let Q=1.0

(K) Keys: Tom=2.0, eats=0.1, fish=1.5 -> [2.0,0.1,1.5]

(V) Values:
- Tom = [1, 0] (a subject-y feature)
- eats = [0, 0] (self, less useful here)
- fish = [0, 1] (an object-y feature)

### Calculating Similarity Scores, Qk 
We use the key-query dot product to understand how relevant two words are to each other. A bigger dot product = more relevant.

Qk = [2.0, 0.1, 1.5]

### Scaling
If the vectors are high-dimensional, dot products can get really large, which can mess up the the values in the next step. Numbers are scaled to keep them in a nice range.

After scaling (assume scaling function=1): [2.0, 0.1, 1.5]

### Softmax Function 
Now we take all those similarity scores and run them through a softmax function. The point of this softmax function is to calculate the **attention weights** amongst the words.

After softmax: [0.57, 0.08, 0.35]

### Interpretation 
Considering the word "eats", we can define how much attention it should pay to the other words in the sentence. 
- “eats” pays 57% attention to “Tom,” 
- "eats" pays 35% attention to “fish,” 
- "eats" pays 8% attention to itself

### Weighted Sum of Values (V)
Finally, we apply these attention weights to V, which hold the actual information from each word. 
- "Tom" V = [1, 0] (subject feature)
- "eats" V = [0, 0] (verb feature)
- "fish" V = [0, 1] (object feature)
Weighted sum = 0.57·[1,0] + 0.35·[0,1] ≈ [0.57, 0.35]

**This new vector becomes the updated representation of “eats”. Notice how these numbers are a reprentation of the word's relationship to both "Tom" and "fish"**

### Multi-Head Attention 
Instead of doing the entire process above just once, Transformers do it in parallel across multiple “heads” with different learned Q/K/V projections. Each head can capture a different type of relationship. With several heads running in parallel.

One head might focus on **subject–verb** links. Another might look at **object–verb** links.  

These heads get combined afterwards. An analogy is like having a group of friends watching the same movie concurrently. One focuses on the plot, another on the characters and maybe another on the dialogues. Put all of their knowledge together and you get a much more intricate understanding of the entire movie.

## Why This Was a Big Deal

The results spoke for themselves:

- On English-to-German translation, Transformers set a new state-of-the-art with a **BLEU score of 28.4**
- The model generalised well beyond translation, it was able to perform well in tasks like English parsing too

By solving sequence problems with attention, Transformers opened the door to models like **BERT**, **GPT**, and all the large language models we use today. That's why this one paper is cited everywhere... it marked the beginning of the modern AI wave. So, next time you hear *"attention is all you need,"* know it's not just a catchy phrase. It's also the research paper that revolutionised the AI landscape. 

And that's why the Transformers architecture *transformed* (get it) the tech world as we know it today. 