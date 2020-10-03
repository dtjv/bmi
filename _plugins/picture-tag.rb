Jekyll::Hooks.register :documents, :pre_render do |doc, payload|
  unless ENV['JEKYLL_ENV'] == "nopic"
    doc.content.gsub!(/!\[(.*)\]\(([^\)]+)\)/, '{% picture \2 --alt \1 %}')
  end
end
