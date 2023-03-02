import spacy
import random
import json

# Load the spaCy NLP model
nlp = spacy.load('en_core_web_sm')

# Define the training data
train_data = [
    ('Barack Obama was born in Hawaii.', {'entities': [(0, 12, 'PERSON'), (28, 34, 'GPE')]}),
    ('Steve Jobs was the CEO of Apple.', {'entities': [(0, 10, 'PERSON'), (24, 29, 'ORG')]}),
    ('The Eiffel Tower is in Paris.', {'entities': [(4, 17, 'LOC'), (21, 27, 'GPE')]}),
    ('Elon Musk founded SpaceX.', {'entities': [(0, 8, 'PERSON'), (16, 22, 'ORG')]}),
    ('The Mona Lisa was painted by Leonardo da Vinci.', {'entities': [(4, 13, 'WORK_OF_ART'), (27, 43, 'PERSON')]}),
    # Add more training examples here as needed
]

# Train the model
nlp.entity.add_label('LOC')  # Add a new label for locations
nlp.entity.add_label('WORK_OF_ART')  # Add a new label for works of art

# Set up the optimizer
optimizer = nlp.begin_training()

# Iterate over the training data and update the model
for i in range(10):
    random.shuffle(train_data)
    for text, annotations in train_data:
        doc = nlp.make_doc(text)
        example = spacy.training.Example.from_dict(doc, annotations)
        nlp.update([example], sgd=optimizer)

# Test the model
text = 'The Louvre is a museum located in Paris.'
doc = nlp(text)

# Output the results as JSON
output_data = []
for ent in doc.ents:
    output_data.append({'text': ent.text, 'start_char': ent.start_char, 'end_char': ent.end_char, 'label': ent.label_})
json.dump(output_data, open('output.json', 'w'))