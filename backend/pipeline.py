# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("image-classification", model="yangy50/garbage-classification")
pipe("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/parrots.png")