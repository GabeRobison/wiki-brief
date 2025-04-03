pub mod summarizer {
    use std::collections::{HashMap, HashSet};

    // Represents a sentence and its score for sorting later
    struct WordCount {
        word: String,
        count: usize,
    }

    impl WordCount {
        fn new(word: String, count: usize) -> Self {
            WordCount { word, count }
        }
    }

    pub fn summarize(text: &str) -> String {
        // Tracks word frequencies per sentence
        let mut word_counts: HashMap<String, HashMap<String, usize>> = HashMap::new();

        for sentence in text.split_terminator('.') {
            let words: Vec<&str> = sentence.split_whitespace().collect();
            let mut sentence_word_counts: HashMap<String, usize> = HashMap::new();

            for word in words {
                let count = sentence_word_counts.entry(word.to_string()).or_insert(0);
                *count += 1;
            }

            word_counts.insert(sentence.to_string(), sentence_word_counts);
        }

        // Build a set of all unique words
        let mut unique_words: HashSet<String> = HashSet::new();
        for sentence_word_counts in word_counts.values() {
            for word in sentence_word_counts.keys() {
                unique_words.insert(word.to_string());
            }
        }

        // Calculate IDF for each word
        let mut idf: HashMap<String, f64> = HashMap::new();
        let num_sentences = word_counts.len();

        for word in &unique_words {
            let mut docs_with_word = 0;
            for sentence_word_counts in word_counts.values() {
                if sentence_word_counts.contains_key(word) {
                    docs_with_word += 1;
                }
            }
            idf.insert(word.to_string(), (num_sentences as f64 / docs_with_word as f64).ln());
        }

        // Compute TF-IDF scores for each word in each sentence
        let mut tf_idf: HashMap<String, HashMap<String, f64>> = HashMap::new();
        for (sentence, sentence_word_counts) in &word_counts {
            let mut sentence_tf_idf: HashMap<String, f64> = HashMap::new();
            for (word, count) in sentence_word_counts {
                if let Some(idf_score) = idf.get(word) {
                    sentence_tf_idf.insert(word.to_string(), (*count as f64 * idf_score) / num_sentences as f64);
                }
            }
            tf_idf.insert(sentence.to_string(), sentence_tf_idf);
        }

        // Score each sentence by total TF-IDF
        let mut sorted_sentences: Vec<WordCount> = tf_idf
            .iter()
            .map(|(sentence, sentence_tf_idf)| {
                let total_score: f64 = sentence_tf_idf.values().sum();
                WordCount::new(sentence.to_string(), total_score as usize)
            })
            .collect();

        sorted_sentences.sort_by(|a, b| b.count.cmp(&a.count));

        // Return top 10 scored sentences as the summary
        sorted_sentences
            .into_iter()
            .take(10)
            .map(|s| s.word)
            .collect::<Vec<_>>()
            .join(". ") + "."
    }
}
