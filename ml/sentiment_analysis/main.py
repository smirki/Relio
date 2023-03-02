# Import the necessary libraries
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

# Define the dataset
reviews = ["This product is great", "I love this product", "This product is terrible", "I hate this product"]
labels = [1, 1, 0, 0]

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(reviews, labels, test_size=0.2, random_state=42)

# Convert the reviews into numerical vectors using CountVectorizer
vectorizer = CountVectorizer()
X_train_vectors = vectorizer.fit_transform(X_train)
X_test_vectors = vectorizer.transform(X_test)

# Train the model using Multinomial Naive Bayes
model = MultinomialNB()
model.fit(X_train_vectors, y_train)

# Test the model on the testing set and calculate the accuracy
y_pred = model.predict(X_test_vectors)
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
